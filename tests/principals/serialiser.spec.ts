// import {expect} from 'chai';

import {expect} from 'chai';
import {PrincipalJSONSerialiser} from '../../src/principals/serialiser';
import {
  AccountPrincipal,
  ArnPrincipal,
  Principal,
  ServicePrincipal,
  FederatedPrincipal,
} from '../../src';

describe('#PrincipalJSONSerialiser', function() {
  describe('#toJSON', function() {
    describe('when having an empty list of principals', function() {
      const principals: Principal[] = [];
      it('should return undefined', function() {
        expect(PrincipalJSONSerialiser.toJSON(principals)).to.be.undefined;
      });
    });

    describe('when having one AWS principal', function() {
      const arn = 'arn:aws:iam::012345678900:user/aUser';
      const principals = [new ArnPrincipal(arn)];
      it('should return a JSON object having an AWS property having one string', function() {
        expect(PrincipalJSONSerialiser.toJSON(principals)).to.deep.equal({AWS: arn});
      });
    });

    describe('when having one Service principal', function() {
      const service = 'aservice.amazonaws.com';
      const principals = [new ServicePrincipal(service)];
      it('should return a JSON object having a Service property having one string', function() {
        expect(PrincipalJSONSerialiser.toJSON(principals)).to.deep.equal({Service: service});
      });
    });

    describe('when having one Federated principal', function() {
      const identityProvider = 'www.amazon.com';
      const principals = [new FederatedPrincipal(identityProvider)];
      it('should return a JSON object having a Federated property having one string', function() {
        expect(PrincipalJSONSerialiser.toJSON(principals)).to.deep.equal({Federated: identityProvider});
      });
    });

    describe('when having an AWS and Service principal', function() {
      const arn = 'arn:aws:iam::012345678900:user/aUser';
      const service = 'aservice.amazonaws.com';
      const principals = [new ArnPrincipal(arn), new ServicePrincipal(service)];
      it('should return a JSON object having an AWS and Service property each having one string',
          function() {
            expect(PrincipalJSONSerialiser.toJSON(principals)).to.deep.equal({AWS: arn, Service: service});
          });
    });

    describe('when having two AWS principals', function() {
      const accountID = '012345678900';
      const userArn = `arn:aws:iam::${accountID}:user/user1`;
      const principals = [new ArnPrincipal(userArn), new AccountPrincipal(accountID)];
      it('should return a JSON object having an AWS property having a two item string array', function() {
        expect(PrincipalJSONSerialiser.toJSON(principals)).to.deep.equal({AWS: [userArn, accountID]});
      });
    });

    describe('when having two identical AWS principals', function() {
      const userArn = `arn:aws:iam::111122223333:role/aRole`;
      const principals = [new ArnPrincipal(userArn), new ArnPrincipal(userArn)];
      it('should return a JSON object having an AWS property having a two item string array', function() {
        expect(PrincipalJSONSerialiser.toJSON(principals)).to.deep.equal({AWS: [userArn, userArn]});
      });
    });

    describe('when having two Service principals', function() {
      const service1 = 'service1.amazonaws.com';
      const service2 = 'service2.amazonaws.com';
      const principals = [new ServicePrincipal(service1), new ServicePrincipal(service2)];
      it('should return a JSON object having an Service property having a two item string array', function() {
        expect(PrincipalJSONSerialiser.toJSON(principals)).to.deep.equal({Service: [service1, service2]});
      });
    });

    describe('when having two identical Service principals', function() {
      const service = 'aservice.amazonaws.com';
      const principals = [new ServicePrincipal(service), new ServicePrincipal(service)];
      it('should return a JSON object having an Service property having a two item string array', function() {
        expect(PrincipalJSONSerialiser.toJSON(principals)).to.deep.equal({Service: [service, service]});
      });
    });
  });
});
