/*
 * Copyright 2008 Netflix, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function percentEncode(s) {
  if (s == null) {
    return "";
  }
  if (s instanceof Array) {
    var e = "";
    for (var i = 0; i < s.length; ++s) {
      if (e != "") e += '&';
      e += percentEncode(s[i]);
    }
    return e;
  }
  s = encodeURIComponent(s);
  // Now replace the values which encodeURIComponent doesn't do
  // encodeURIComponent ignores: - _ . ! ~ * ' ( )
  // OAuth dictates the only ones you can ignore are: - _ . ~
  // Source: http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Functions:encodeURIComponent
  s = s.replace(/\!/g, "%21");
  s = s.replace(/\*/g, "%2A");
  s = s.replace(/\'/g, "%27");
  s = s.replace(/\(/g, "%28");
  s = s.replace(/\)/g, "%29");
  return s;
}

Date.prototype.getGMTOffset = function() {
  return (this.getTimezoneOffset() > 0 ? "-" : "+")
          + String.leftPad(Math.floor(this.getTimezoneOffset() / 60), 2, "0")
          + String.leftPad(this.getTimezoneOffset() % 60, 2, "0");
}
String.leftPad = function (val, size, ch) {
  var result = new String(val);
  if (ch == null) {
    ch = " ";
  }
  while (result.length < size) {
    result = ch + result;
  }
  return result;
}

var d = new Date();
var timestamp = d.getFullYear() + "-" + String.leftPad(d.getMonth() + 1, 2, '0') + "-" + String.leftPad(d.getDate(), 2, '0') +
                "T" + String.leftPad(d.getHours(), 2, '0') + ":" + String.leftPad(d.getMinutes(), 2, '0') + ":" + String.leftPad(d.getSeconds(), 2, '0') +
                d.getGMTOffset();

function signparams(secret, params) {
  params.sort(function(a, b) {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
  var i = 0;
  var url = "";
  for each (var param in params) {
    if (i++ != 0) url += "&";
    url += param[0];
    url += "=";
    url += percentEncode(param[1]);
  }
  var sign = y.crypto.hmacSHA256(secret, "GET\nsdb.amazonaws.com\n/\n" + url);
  // Calculate the 28 character signature
  while (sign.length < 28) {
    sign += "=";
  }
  return "http://sdb.amazonaws.com/?" + url + "&Signature=" + percentEncode(sign);
}

var awsparams = [
  ["AWSAccessKeyId", access],
  ["SignatureMethod","HmacSHA256"],
  ["SignatureVersion", "2"],
  ["Timestamp", timestamp],
  ["Version", "2007-11-07"]
];
