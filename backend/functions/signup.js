"use strict";

const { contactType, sanitize } = require("./format-data.js");
const { corsHeaders, addContact } = require("./db.js");
const { signup } = require("./pinpoint");

exports.handler = function (event, context, callback) {
  if (event.body == null)
    callback(null, { statusCode: "400", headers: corsHeaders });

  const body = JSON.parse(event.body);
  if (body.contact == null)
    callback(null, { statusCode: "200", headers: corsHeaders });
  const contact = sanitize(body.contact);
  const type = contactType(contact);
  if (body.code == null) body.code = "";
  const code = sanitize(body.code);

  addContact({ contact, type, isUser: true, code, optIn: false }, function (
    rsp
  ) {
    if (rsp.success) {
      signup({ contact, type, code }, function (err, data) {
        console.log(err, err.stack);
      });
      callback(null, { statusCode: "200", headers: corsHeaders });
    } else callback(null, { statusCode: "500", headers: corsHeaders });
  });
};
