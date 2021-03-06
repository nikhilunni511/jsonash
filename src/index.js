const { camelCase, toUpper } = require("lodash");
const lodash = require("lodash");
lodash.pascalCase = (str) => camelCase(str).replace(/^(.)/, toUpper);

const getKeys = (obj) => Object.keys(obj);

const getValueByIndex = (obj, is, value) => {
  if (typeof is == "string") return getValueByIndex(obj, is.split("."), value);
  else if (is.length == 1 && value !== undefined) return (obj[is[0]] = value);
  else if (is.length == 0) return obj;
  else return getValueByIndex(obj[is[0]], is.slice(1), value);
};

const sort = (objArray, options = {}) => {
  const desc = !!options.desc;
  if (!Array.isArray(objArray))
    throw new Error("Argument must be of type array");
  if (!options.path) throw new Error("path is required");
  objArray.sort((obj1, obj2) => {
    const a = getValueByIndex(obj1, options.path),
      b = getValueByIndex(obj2, options.path);
    if (a < b) return desc ? 1 : -1;
    if (a > b) return desc ? -1 : 1;
    return 0;
  });
  return objArray;
};

const convertKeys = (obj, toWhich) => {
  const obj1 = {};
  Object.keys(obj).map((item) => {
    if (typeof obj[item] === "object" && obj[item] !== null) {
      obj1[lodash[`${toWhich}`](item)] = convertKeys(obj[item], toWhich);
    } else {
      obj1[lodash[`${toWhich}`](item)] = obj[item];
    }
  });
  return obj1;
};

const toCamelCase = (obj) => {
  return Array.isArray(obj)
    ? obj.map((item) => convertKeys(item, "camelCase"))
    : convertKeys(obj, "camelCase");
};

const toSnakeCase = (obj) => {
  return Array.isArray(obj)
    ? obj.map((item) => convertKeys(item, "snakeCase"))
    : convertKeys(obj, "snakeCase");
};

const toPascalCase = (obj) => {
  return Array.isArray(obj)
    ? obj.map((item) => convertKeys(item, "pascalCase"))
    : convertKeys(obj, "pascalCase");
};

const replacetKeysFromObj = (obj, oldKey, newKey) => {
  const obj1 = {};
  Object.keys(obj).map((item) => {
    let tempData;
    if (typeof obj[item] === "object" && obj[item] !== null) {
      tempData = replacetKeysFromObj(obj[item], oldKey, newKey);
    } else {
      tempData = obj[item];
    }

    if (item === oldKey) obj1[newKey] = tempData;
    else obj1[item] = tempData;
  });
  return obj1;
};

const replacetKeys = (obj, oldKey, newKey) => {
  return Array.isArray(obj)
    ? obj.map((item) => replacetKeysFromObj(item, oldKey, newKey))
    : replacetKeysFromObj(obj, oldKey, newKey);
};

const validateObj = (obj, options) => {
  if (!options || !options.rules) throw new Error("No rules provided");
  const { rules } = options;
  const objKeys = Object.keys(rules);
  const err = { error: false };
  objKeys.forEach((element) => {
    if (!!obj[element]) {
      err[element] = [];
      if (rules[element].type && typeof obj[element] !== rules[element].type) {
        err[element].push(`${element} must be of type ${rules[element].type}`);
        err.error = true;
      } else if (
        rules[element].type &&
        ["string", "number"].includes(rules[element].type)
      ) {
        if (
          rules[element].max &&
          (obj[element] + "").length > rules[element].max
        ) {
          err[element].push(
            `${element} must contain a maximum of ${rules[element].max} characters.`
          );
          err.error = true;
        }
        if (
          rules[element].min &&
          (obj[element] + "").length < rules[element].min
        ) {
          err[element].push(
            `${element} must contain atleast ${rules[element].min} characters.`
          );
          err.error = true;
        }
      }
    } else {
      if (!!rules[element].required) {
        err[element] = ["required"];
        err.error = true;
      }
    }
  });
  return err;
};

const validate = (obj, options) => {
  const err = validateObj(obj, options);
  return (err.error && err) || true;
};

const formatKey = (obj, cb) => {
  const obj1 = {};
  Object.keys(obj).map((item) => {
    if (typeof obj[item] === "object" && obj[item] !== null) {
      obj1[cb(item)] = formatKey(obj[item], cb);
    } else {
      obj1[cb(item)] = obj[item];
    }
  });
  return obj1;
};

const formatKeys = (obj, cb) => {
  return Array.isArray(obj)
    ? obj.map((item) => formatKey(item, cb))
    : formatKey(obj, cb);
};

module.exports = {
  sort,
  toCamelCase,
  toSnakeCase,
  toPascalCase,
  replacetKeys,
  validate,
  formatKeys,
};
