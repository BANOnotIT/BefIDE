/**
 * Created by BANO.notIT on 08.03.17.
 */

let ASCII = require("../src/modules/ASCII");

let should = require("should");

describe("Поддержка ASCII", function () {

    describe("#fromNumeric2ASCII", function () {

        it("should return correct chars on codes", function () {

            ASCII.fromNumeric2ASCII(32).should.be.eql(' ');
            ASCII.fromNumeric2ASCII(9).should.be.eql('\t')

        });

        /*
         // doesn't work...
         it("should throw exception if code if out of range", function () {

         ASCII.fromNumeric2ASCII(0).should.throw("Number 0 is out of printable ASCII range")

         })
         */

    });

    describe("#fromASCII2Numeric", function () {

        it("should return correct codes in chars", function () {

            ASCII.fromASCII2Numeric(' ').should.be.eql(32);
            ASCII.fromASCII2Numeric('\t').should.be.eql(9);

        })

    });

});