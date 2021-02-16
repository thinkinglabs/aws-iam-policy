import {expect} from 'chai';
import {PrincipalJSONDeserialiser} from '../../src/principals/deserialiser';
import {ArnPrincipal} from '../../src/principals/arn';
import {ServicePrincipal} from '../../src/principals/service';
import {RootAccountPrincipal} from '../../src/principals/root-account';
import {AccountPrincipal} from '../../src/principals/account';
import {AnonymousUserPrincipal} from '../../src/principals/anonymous';

describe('#PrincipalJSONDeserialise', function() {
  describe('#fromJSON', function() {
    describe('when having an undefined principal', function() {
      it('should return an empty principal array', function() {
        const input = undefined;
        expect(PrincipalJSONDeserialiser.fromJSON(input)).to.deep.equal([]);
      });
    });

    describe('when having an AWS principal having one arn', function() {
      it('should return one ArnPrincipal', function() {
        const arn = 'arn:aws:iam::012345678900:user/aUser';
        const input = {AWS: [arn]};
        expect(PrincipalJSONDeserialiser.fromJSON(input)).to.deep.equal([new ArnPrincipal(arn)]);
      });
    });

    describe('when having an AWS anonymous user principal', function() {
      it('should return one AnonymousUserPrincipal', function() {
        const input = {AWS: ['*']};
        expect(PrincipalJSONDeserialiser.fromJSON(input)).to.deep.equal([new AnonymousUserPrincipal()]);
      });
    });

    describe('when having a Service principal having one service', function() {
      it('should return one ServicePrincipal', function() {
        const input = {Service: ['aService']};
        expect(PrincipalJSONDeserialiser.fromJSON(input)).to.deep.equal([new ServicePrincipal('aService')]);
      });
    });

    describe('when having an unknown principal', function() {
      it('should throw an error', function() {
        const input = {Unknown: ['unknown']};
        expect(() => PrincipalJSONDeserialiser.fromJSON(input)).to.throw(Error)
            .with.property('message', 'Unsupported principal "Unknown"');
      });
    });

    describe('when having an AWS principal having two arns', function() {
      it('should return a list having two ArnPrincipal', function() {
        const role1Arn = 'arn:aws:iam::111122223333:role/role1';
        const role2Arn = 'arn:aws:iam::111122223333:role/role2';
        const input = {AWS: [role1Arn, role2Arn]};
        const expected = [new ArnPrincipal(role1Arn), new ArnPrincipal(role2Arn)];
        expect(PrincipalJSONDeserialiser.fromJSON(input)).to.deep.equal(expected);
      });
    });

    describe('when having a Service principal having two services', function() {
      it('should return a list having two ServicePrincipal', function() {
        const input = {Service: ['service1', 'service2']};
        const expected = [new ServicePrincipal('service1'), new ServicePrincipal('service2')];
        expect(PrincipalJSONDeserialiser.fromJSON(input)).to.deep.equal(expected);
      });
    });

    describe('when having both an AWS and Service principal', function() {
      it('should return a list having an ArnPrincipal and a ServicePrincipal', function() {
        const arn = 'arn:aws:iam::123456789012:user/aUser';
        const input = {AWS: [arn], Service: ['aService']};
        const expected = [new ArnPrincipal(arn), new ServicePrincipal('aService')];
        expect(PrincipalJSONDeserialiser.fromJSON(input)).to.deep.equal(expected);
      });
    });

    describe('when having both an AWS principal having an IAM user, a root account and an account ID', function() {
      it('should return a list having an ArnPrincipal and a ServicePrincipal', function() {
        const accountID = '012345678900';
        const userArn = `arn:aws:iam::${accountID}:user/aUser`;
        const rootAccountArn = `arn:aws:iam::${accountID}:root`;
        const input = {AWS: [userArn, rootAccountArn, accountID]};
        const expected = [
          new ArnPrincipal(userArn),
          new RootAccountPrincipal(accountID),
          new AccountPrincipal(accountID),
        ];
        expect(PrincipalJSONDeserialiser.fromJSON(input)).to.deep.equal(expected);
      });
    });

    describe('when having an AWS principal with an unsupported ARN', function() {
      it('should throw an error', function() {
        expect(() => PrincipalJSONDeserialiser.fromJSON({AWS: ['anArn']})).to.throw(Error)
            .with.property('message', 'Unsupported AWS principal value "anArn"');
      });
    });
  });
});
