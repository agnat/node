function errorInFirstLine() { return new Error('kaputt') } // l: 1 c: 38
// This has to be on the first line. It tests that we successfully hide the
// module prologue. So this had to wait:

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


var assert = require('assert');

Error.prepareStackTrace = function(f, frames) { return frames }

function test_error_origin(error, expectedLine, expectedColumn) {
  var origin = error.stack[0];
  assert.strictEqual(origin.getLineNumber(), expectedLine);
  assert.strictEqual(origin.getColumnNumber(), expectedColumn);
}

var errorInFirstColumn =
new Error('gone to market, out for lunch'); // l: 38 c: 1

test_error_origin(errorInFirstLine(), 1, 38);
test_error_origin(errorInFirstColumn, 38, 1);
