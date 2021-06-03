import {expect} from 'chai';
import {PolicyDocument} from '../../src/policy/policy';
import {Statement} from '../../src/statement/statement';
import {ArnPrincipal} from '../../src/principals/arn';
import {ServicePrincipal} from '../../src/principals/service';
import {RootAccountPrincipal} from '../../src/principals/root-account';
import {AccountPrincipal} from '../../src/principals/account';
import {Condition} from '../../src/condition/condition';

describe('#PolicyDocument', function() {
  describe('when serialising to JSON', function() {
    const policy = new PolicyDocument([
      new Statement({
        sid: 'anSID',
        effect: 'Allow',
        principals: [
          new ArnPrincipal('arn:aws:iam::123456789000:user/aUser'),
          new RootAccountPrincipal('123456789000'),
          new AccountPrincipal('123456789000'),
          new ServicePrincipal('aservice.amazonaws.com'),
        ],
        actions: ['ec2:Describe*', 'ec2:Get*'],
        resources: [
          'arn:aws:ec2:eu-west-1:123456789000:instance/i-123456',
          'arn:aws:ec2:eu-west-1:123456789000:image/ami-123456',
        ],
        conditions: [
          new Condition('StringEquals', 'kms:CallerAccount', ['456252097346']),
          new Condition('StringEquals', 'kms:ViaService', ['secretsmanager.eu-west-1.amazonaws.com']),
          new Condition('StringNotEquals', 'aws:userid', ['anId1', 'anId2']),
        ],
      }),
      new Statement({
        sid: 'anSID2',
        effect: 'Deny',
        principals: [new ArnPrincipal('arn:aws:iam::123456789000:role/aRole')],
        actions: ['ec2:TerminateInstance'],
        resources: ['arn:aws:ec2:eu-west-1:123456789000:instance/i-123456'],
      }),
    ]);

    it('should successfully pass a JSON round trip', function() {
      const json = policy.json;
      const actual = PolicyDocument.fromJson(json);
      expect(actual).to.deep.equal(policy);
    });
  });

  describe('#fromJson', function() {
    describe('when Statement is not an array', function() {
      it('should throw an Error', function() {
        const input = JSON.stringify({Statement: new Statement({sid: 'not an array'})});
        expect(() => PolicyDocument.fromJson(input)).to.throw(Error)
            .with.property('message', 'Statement must be an array');
      });
    });
  });

  describe('#constructor', function() {
    describe('when empty', function() {
      const policy = new PolicyDocument();

      it('should be empty', function() {
        expect(policy.isEmpty).to.be.true;
      });
    });

    describe('when adding 1 statement', function() {
      const policy = new PolicyDocument([new Statement()]);

      it('should have one statement', function() {
        expect(policy.statementCount).to.be.equal(1);
      });
    });

    describe('when adding 2 statements having the same Sid', function() {
      it('should throw an error', function() {
        const sid = 'anSid';
        expect(() => new PolicyDocument([
          new Statement({sid: sid}),
          new Statement({sid: sid, resources: ['*']}),
        ])).to.throw(Error).with.property('message', 'Non-unique Sid "anSid"');
      });
    });
  });

  describe('when having statements', function() {
    const policy = new PolicyDocument([
      new Statement({sid: 'first sid', resources: ['resource1']}),
      new Statement({resources: ['resource2']}),
      new Statement({sid: 'third sid', resources: ['resource3']}),
      new Statement({sid: 'fourth sid', resources: ['resource4']}),
    ]);

    describe('#getStatement', function() {
      describe('when Sid exists', function() {
        it('should return the statement having the given Sid', function() {
          const expected = new Statement({sid: 'third sid', resources: ['resource3']});
          expect(policy.getStatement('third sid')).to.deep.equal(expected);
        });
      });

      describe('when Sid doesn\'t exist', function() {
        it('should return undefined', function() {
          expect(policy.getStatement('an sid')).to.be.undefined;
        });
      });
    });
  });

  describe('#addStatement', function() {
    describe('when policy is empty', function() {
      describe('when adding 1 statement', function() {
        const policy = new PolicyDocument();
        const statement = new Statement({sid: 'sid', resources: ['resource']});
        policy.addStatements(statement);
        it('should have one statement', function() {
          expect(policy.statementCount).to.be.equal(1);
          expect(policy.getStatement('sid')).to.deep.equal(statement);
        });
      });

      describe('when adding 2 statements', function() {
        const policy = new PolicyDocument();
        const statement1 = new Statement({sid: 'sid1', resources: ['resource1']});
        const statement2 = new Statement({sid: 'sid2', resources: ['resource2']});
        policy.addStatements(statement1, statement2);
        it('should have two statements', function() {
          expect(policy.statementCount).to.be.equal(2);
          expect(policy.getStatement('sid1')).to.deep.equal(statement1);
          expect(policy.getStatement('sid2')).to.deep.equal(statement2);
        });
      });
    });

    describe('when policy is not empty', function() {
      describe('when adding 1 statement', function() {
        const policy = new PolicyDocument([
          new Statement({sid: 'sid1', resources: ['resource1']}),
        ]);
        const statement = new Statement({sid: 'sid2', resources: ['resource2']});
        policy.addStatements(statement);
        it('should have one statement', function() {
          expect(policy.statementCount).to.be.equal(2);
          expect(policy.getStatement('sid2')).to.deep.equal(statement);
        });
      });

      describe('when adding 2 statements', function() {
        const policy = new PolicyDocument([
          new Statement({sid: 'sid1', resources: ['resource1']}),
        ]);
        const statement2 = new Statement({sid: 'sid2', resources: ['resource2']});
        const statement3 = new Statement({sid: 'sid3', resources: ['resource3']});
        policy.addStatements(statement2, statement3);
        it('should have one statement', function() {
          expect(policy.statementCount).to.be.equal(3);
          expect(policy.getStatement('sid2')).to.deep.equal(statement2);
          expect(policy.getStatement('sid3')).to.deep.equal(statement3);
        });
      });
    });
  });

  describe('identity-based policy', function() {
    const policy = new PolicyDocument([
      new Statement({sid: '1st', actions: ['action'], resources: ['resource']}),
      new Statement({sid: '2nd', actions: ['action'], resources: ['resource']}),
    ]);

    it('should be valid for identity-based policy', function() {
      expect(policy.validateForIdentityPolicy()).to.have.empty;
    });

    it('should be invalid for resource-based policy', function() {
      const errors = policy.validateForResourcePolicy();
      expect(errors).to.deep.equal([
        'Statement(1st) must specify at least one IAM principal.',
        'Statement(2nd) must specify at least one IAM principal.',
      ]);
    });
  });

  describe('resource-based policy', function() {
    const policy = new PolicyDocument([
      new Statement({sid: '1st', principals: [new AccountPrincipal('012345678900')], actions: ['action']}),
      new Statement({sid: '2nd', principals: [new AccountPrincipal('012345678900')], actions: ['action']}),
    ]);

    it('should be valid for resource-based policy', function() {
      expect(policy.validateForResourcePolicy()).to.have.empty;
    });

    it('should be invalid for identity-based policy', function() {
      const errors = policy.validateForIdentityPolicy();
      expect(errors).to.deep.equal([
        'Statement(1st) cannot specify any IAM principals.',
        'Statement(1st) must specify at least one resource.',
        'Statement(2nd) cannot specify any IAM principals.',
        'Statement(2nd) must specify at least one resource.',
      ]);
    });
  });

  describe('policy without actions', function() {
    const policy = new PolicyDocument([
      new Statement({sid: '1st'}),
      new Statement({sid: '2nd'}),
    ]);

    it('should be invalid for any policy', function() {
      const errors = policy.validateForAnyPolicy();
      expect(errors).to.deep.equal([
        'Statement(1st) must specify at least one \'action\'.',
        'Statement(2nd) must specify at least one \'action\'.',
      ]);
    });

    it('should be invalid for resource-based policy', function() {
      const errors = policy.validateForResourcePolicy();
      expect(errors).to.deep.equal([
        'Statement(1st) must specify at least one \'action\'.',
        'Statement(1st) must specify at least one IAM principal.',
        'Statement(2nd) must specify at least one \'action\'.',
        'Statement(2nd) must specify at least one IAM principal.',
      ]);
    });

    it('should be invalid for identity-based policy', function() {
      const errors = policy.validateForIdentityPolicy();
      expect(errors).to.deep.equal([
        'Statement(1st) must specify at least one \'action\'.',
        'Statement(1st) must specify at least one resource.',
        'Statement(2nd) must specify at least one \'action\'.',
        'Statement(2nd) must specify at least one resource.',
      ]);
    });
  });
});
