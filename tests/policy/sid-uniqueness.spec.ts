import {expect} from 'chai';
import {SidUniquenessValidator} from '../../src/policy/sid-uniqueness';
import {IAMPolicyStatement} from '../../src/statement/statement';

describe('#SidUniquenessValidator', function() {
  describe('#validate', function() {
    describe('when statements is empty', function() {
      const validator = new SidUniquenessValidator([]);
      it('should return true when adding an empty statement', function() {
        expect(validator.validate(new IAMPolicyStatement())).to.be.true;
      });

      it('should return true when adding a statement having an Sid', function() {
        expect(validator.validate(new IAMPolicyStatement({sid: 'an sid'}))).to.be.true;
      });
    });

    describe('when statements has one statement without Sid', function() {
      const validator = new SidUniquenessValidator([new IAMPolicyStatement({resources: ['*']})]);
      it('should return true when adding an empty statement', function() {
        expect(validator.validate(new IAMPolicyStatement())).to.be.true;
      });

      it('should return true when adding a statement having an Sid', function() {
        expect(validator.validate(new IAMPolicyStatement({sid: 'an sid'}))).to.be.true;
      });
    });

    describe('when statements has one statement with Sid', function() {
      const sid = 'an sid';
      const validator = new SidUniquenessValidator([new IAMPolicyStatement({sid: sid})]);
      it('should return true when adding an empty statement', function() {
        expect(validator.validate(new IAMPolicyStatement())).to.be.true;
      });

      it('should return false when adding a statement with the same Sid', function() {
        expect(validator.validate(new IAMPolicyStatement({sid: sid}))).to.be.false;
      });
    });

    describe('when statements has one statement having an Sid', function() {
      const sid = 'an sid';
      const validator = new SidUniquenessValidator([new IAMPolicyStatement({sid: sid})]);
      it('should return true when adding an empty statement', function() {
        expect(validator.validate(new IAMPolicyStatement())).to.be.true;
      });

      it('should return false when adding a statement with the same Sid', function() {
        expect(validator.validate(new IAMPolicyStatement({sid: sid}))).to.be.false;
      });
    });

    describe('when statements has 5 statements having an Sid', function() {
      const sid = 'the sid';
      const validator = new SidUniquenessValidator([
        new IAMPolicyStatement({sid: 'sid1'}),
        new IAMPolicyStatement({sid: 'sid2'}),
        new IAMPolicyStatement({sid: sid}),
        new IAMPolicyStatement({sid: 'sid4'}),
        new IAMPolicyStatement({sid: 'sid5'}),
      ]);
      it('should return true when adding an empty statement', function() {
        expect(validator.validate(new IAMPolicyStatement())).to.be.true;
      });

      it('should return false when adding a statement having an existing Sid', function() {
        expect(validator.validate(new IAMPolicyStatement({sid: sid}))).to.be.false;
      });
    });

    describe('when statements has a mix of statements having and having not an Sid', function() {
      const sid = 'the sid';
      const validator = new SidUniquenessValidator([
        new IAMPolicyStatement({resources: ['arn:aws:ec2:eu-west-1:112233445566:instance/i-1234']}),
        new IAMPolicyStatement({sid: 'sid2'}),
        new IAMPolicyStatement({sid: sid}),
        new IAMPolicyStatement({resources: ['arn:aws:ec2:eu-west-1:112233445566:instance/i-5678']}),
        new IAMPolicyStatement({sid: 'sid5'}),
      ]);
      it('should return true when adding an empty statement', function() {
        expect(validator.validate(new IAMPolicyStatement())).to.be.true;
      });

      it('should return false when adding a statement having an existing Sid', function() {
        expect(validator.validate(new IAMPolicyStatement({sid: sid}))).to.be.false;
      });
    });
  });
});
