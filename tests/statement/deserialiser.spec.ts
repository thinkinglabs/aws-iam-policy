import {expect} from 'chai';
import {Condition} from '../../src/condition/condition';
import {AccountPrincipal} from '../../src/principals/account';
import {ArnPrincipal} from '../../src/principals/arn';
import {StatementJSONDeserialiser} from '../../src/statement/deserialiser';
import {Statement} from '../../src/statement/statement';
import {WildcardPrincipal} from '../../src/principals/wildcard';

describe('#StatementDeserialiser', function() {
  describe('when JSON is empty', function() {
    const json = {};
    it('should return an empty Statement', function() {
      const expected = new Statement();
      expect(StatementJSONDeserialiser.fromJSON(json)).to.deep.equal(expected);
    });
  });

  describe('when JSON has an Action', function() {
    describe('and its value is an object', function() {
      const json = {
        Action: {property: 'value'},
      };
      it('should throw an Error', function() {
        expect(() => StatementJSONDeserialiser.fromJSON(json)).to.throw(Error)
            .with.property('message', 'Unsupported type: expecting an array or a string');
      });
    });

    describe('and its value is a string', function() {
      const json = {
        Action: 'action',
      };
      it('should return a Statement with actions', function() {
        const actual = StatementJSONDeserialiser.fromJSON(json);
        const expected = new Statement({
          actions: ['action'],
        });
        expect(actual).to.deep.equal(expected);
      });
    });

    describe('and its value is an array of strings', function() {
      const json = {
        Action: ['action'],
      };
      it('should return a Statement with actions', function() {
        const expected = new Statement({actions: ['action']});
        expect(StatementJSONDeserialiser.fromJSON(json)).to.deep.equal(expected);
      });
    });

    describe('and its value is an array of numbers', function() {
      const json = {
        Action: [123],
      };
      it('should throw an Error', function() {
        expect(() => StatementJSONDeserialiser.fromJSON(json)).to.throw(Error)
            .with.property('message', 'Unsupported type: expecting an array of strings');
      });
    });
  });

  describe('when JSON has a Resource', function() {
    describe('and its value is an object', function() {
      const json = {
        Resource: {property: 'value'},
      };
      it('should throw an Error', function() {
        expect(() => StatementJSONDeserialiser.fromJSON(json)).to.throw(Error)
            .with.property('message', 'Unsupported type: expecting an array or a string');
      });
    });

    describe('and its value is a string', function() {
      const json = {
        Resource: 'resource',
      };
      it('should return a Statement with resources', function() {
        const actual = StatementJSONDeserialiser.fromJSON(json);
        const expected = new Statement({
          resources: ['resource'],
        });
        expect(actual).to.deep.equal(expected);
      });
    });
  });

  describe('when JSON has a NotResource', function() {
    describe('and its value is an object', function() {
      const json = {
        NotResource: {property: 'value'},
      };
      it('should throw an Error', function() {
        expect(() => StatementJSONDeserialiser.fromJSON(json)).to.throw(Error)
            .with.property('message', 'Unsupported type: expecting an array or a string');
      });
    });

    describe('and its value is a string', function() {
      const json = {
        NotResource: 'resource',
      };
      it('should return a Statement with notresources', function() {
        const actual = StatementJSONDeserialiser.fromJSON(json);
        const expected = new Statement({
          notresources: ['resource'],
        });
        expect(actual).to.deep.equal(expected);
      });
    });
  });

  describe('when JSON has a Principal', function() {
    describe('with an AWS principal type', function() {
      describe('and its value is a string', function() {
        it('should return a Statement with principals', function() {
          const json = {
            Principal: {AWS: '123456789012'},
          };
          const actual = StatementJSONDeserialiser.fromJSON(json);
          const expected = new Statement({
            principals: [new AccountPrincipal('123456789012')],
          });
          expect(actual).to.deep.equal(expected);
        });
      });

      describe('and its value is a 1-length array', function() {
        it('should return a Statement with principals', function() {
          const json = {
            Principal: {AWS: ['123456789012']},
          };
          const actual = StatementJSONDeserialiser.fromJSON(json);
          const expected = new Statement({
            principals: [new AccountPrincipal('123456789012')],
          });
          expect(actual).to.deep.equal(expected);
        });
      });

      describe('and its value is a 2-length array', function() {
        it('should return a Statement with principals', function() {
          const json = {
            Principal: {AWS: [
              '123456789012',
              'arn:aws:iam::123456789012:user/foo',
            ]},
          };
          const actual = StatementJSONDeserialiser.fromJSON(json);
          const expected = new Statement({
            principals: [
              new AccountPrincipal('123456789012'),
              new ArnPrincipal('arn:aws:iam::123456789012:user/foo'),
            ],
          });
          expect(actual).to.deep.equal(expected);
        });
      });
    });

    describe('with a wildcard principal', function() {
      it('should return a Statement with an AnonymousPrincipal', function() {
        const json = {
          Principal: '*',
        };
        const actual = StatementJSONDeserialiser.fromJSON(json);
        const expected = new Statement({
          principals: [new WildcardPrincipal()],
        });
        expect(actual).to.deep.equal(expected);
      });
    });
  });

  describe('when JSON has a NotPrincipal', function() {
    describe('with an AWS principal type', function() {
      describe('and its value is a string', function() {
        it('should return a Statement with principals', function() {
          const json = {
            NotPrincipal: {AWS: '123456789012'},
          };
          const actual = StatementJSONDeserialiser.fromJSON(json);
          const expected = new Statement({
            notprincipals: [new AccountPrincipal('123456789012')],
          });
          expect(actual).to.deep.equal(expected);
        });
      });

      describe('and its value is a 1-length array', function() {
        it('should return a Statement with principals', function() {
          const json = {
            NotPrincipal: {AWS: ['123456789012']},
          };
          const actual = StatementJSONDeserialiser.fromJSON(json);
          const expected = new Statement({
            notprincipals: [new AccountPrincipal('123456789012')],
          });
          expect(actual).to.deep.equal(expected);
        });
      });

      describe('and its value is a 2-length array', function() {
        it('should return a Statement with principals', function() {
          const json = {
            NotPrincipal: {AWS: [
              '123456789012',
              'arn:aws:iam::123456789012:user/foo',
            ]},
          };
          const actual = StatementJSONDeserialiser.fromJSON(json);
          const expected = new Statement({
            notprincipals: [
              new AccountPrincipal('123456789012'),
              new ArnPrincipal('arn:aws:iam::123456789012:user/foo'),
            ],
          });
          expect(actual).to.deep.equal(expected);
        });
      });
    });
  });

  describe('when JSON has a Condition', function() {
    describe('with one operator', function() {
      describe('and one key', function() {
        describe('and its key value is a string', function() {
          it('should return a Statement with conditions', function() {
            const json = {
              Condition: {StringEquals: {'aws:username': 'johndoe'}},
            };
            const actual = StatementJSONDeserialiser.fromJSON(json);
            const expected = new Statement({
              conditions: [new Condition('StringEquals', 'aws:username', ['johndoe'])],
            });
            expect(actual).to.deep.equal(expected);
          });
        });

        describe('and its value is a 1-length array', function() {
          it('should return a Statement with conditions', function() {
            const json = {
              Condition: {StringEquals: {'aws:username': ['johndoe']}},
            };
            const actual = StatementJSONDeserialiser.fromJSON(json);
            const expected = new Statement({
              conditions: [new Condition('StringEquals', 'aws:username', ['johndoe'])],
            });
            expect(actual).to.deep.equal(expected);
          });
        });

        describe('and its value is a 2-length array', function() {
          it('should return a Statement with principals', function() {
            const json = {
              Condition: {StringEquals: {'aws:username': ['johndoe', 'joesixpack']}},
            };
            const actual = StatementJSONDeserialiser.fromJSON(json);
            const expected = new Statement({
              conditions: [new Condition('StringEquals', 'aws:username', ['johndoe', 'joesixpack'])],
            });
            expect(actual).to.deep.equal(expected);
          });
        });
      });
    });
  });
});
