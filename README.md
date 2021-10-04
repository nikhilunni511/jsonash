# jsonash

Utility functions for JSON objects

## Installation

To install module:

```
$ npm install --save jsonash
```

## Contents

1. [Sort array of objects](#1-sort-object-based-on-key)
2. [To convert all the keys to camelCase](#2-to-convert-all-the-keys-to-camelcase)
3. [To convert all the keys to snake_Case](#3-to-convert-all-the-keys-to-snake_case)
4. [To convert all the keys to PascalCase](#4-to-convert-all-the-keys-to-pascalcase)
5. [Format key with custom function](#5-format-key-with-custom-function)
6. [To replace a key from the object](#6-to-replace-a-key-from-the-object)
7. [To validate a JSON object](#7-to-validate-a-json-object)

## Usage/Examples

Import jsonash into your file like below:

```javascript
const jsonash = require("jsonash");
```

### 1. Sort object based on key

```javascript
const obj = [
  { a: 1, b: { c: 7 } },
  { a: 5, b: { c: 4 } },
  { a: 8, b: { c: 5 } },
];
/* The object get sorted based on the key obj->b>c */
const options = { desc: true, path: "b.c" };
jsonash.sort(obj, options);

/*
Output: 
[ { a: 1, b: { c: 7 } }, { a: 8, b: { c: 5 } }, { a: 5, b: { c: 4 } } ]
*/
```

The parameter path is required that defines the depth of the object to be sorted.

### 2. To convert all the keys to camelCase

```javascript
const obj = {
  first_name: "John",
  last_name: "John",
  phone_number: 999555,
};
jsonash.toCamelCase(obj);

/*
Output: 
{ firstName: 'John', lastName: 'John', phoneNumber: 999555 }
*/

/* You can pass array of objects to the method */

const objArray = [
  { first_name: "John", last_name: "John", phone_number: 999555 },
  { first_name: "Mike", last_name: "Mike", phone_number: 123 },
  { first_name: "Michael", last_name: "Michael", phone_number: 456 },
];
jsonash.toCamelCase(objArray);

/*
Output:
[
  { firstName: 'John', lastName: 'John', phoneNumber: 999555 },
  { firstName: 'Mike', lastName: 'Mike', phoneNumber: 123 },
  { firstName: 'Michael', lastName: 'Michael', phoneNumber: 456 }
]
*/
```

### 3. To convert all the keys to snake_Case

```javascript
const obj = { firstName: "John", lastName: "John", phoneNumber: 999555 };
jsonash.toSnakeCase(obj);

/*
Output: 
{ first_name: 'John', last_name: 'John', phone_number: 999555 }
*/

/* You can pass array of objects to the method */

const objArray = [
  { firstName: "John", lastName: "John", phoneNumber: 999555 },
  { firstName: "Mike", lastName: "Mike", phoneNumber: 123 },
  { firstName: "Michael", lastName: "Michael", phoneNumber: 456 },
];
jsonash.toCamelCase(objArray);

/*
Output:
[
  { first_name: 'John', last_name: 'John', phone_number: 999555 },
  { first_name: 'Mike', last_name: 'Mike', phone_number: 123 },
  { first_name: 'Michael', last_name: 'Michael', phone_number: 456 }
]
*/
```

### 4. To convert all the keys to PascalCase

```javascript
const obj = {
  first_name: "John",
  last_name: "John",
  phone_number: 999555,
};
jsonash.toCamelCase(obj);

/*
Output: 
{ FirstName: 'John', LastName: 'John', PhoneNumber: 999555 }
*/

/* You can pass array of objects to the method */

const objArray = [
  { first_name: "John", last_name: "John", phone_number: 999555 },
  { first_name: "Mike", last_name: "Mike", phone_number: 123 },
  { first_name: "Michael", last_name: "Michael", phone_number: 456 },
];
jsonash.toCamelCase(objArray);

/*
Output:
[
  { FirstName: 'John', LastName: 'John', PhoneNumber: 999555 },
  { FirstName: 'Mike', LastName: 'Mike', PhoneNumber: 123 },
  { FirstName: 'Michael', LastName: 'Michael', PhoneNumber: 456 }
]
*/
```

### 5. Format key with custom function

```javascript
const obj = {
  first_name: "John",
  last_name: "John",
  phone_number: 999555,
};

function customMethod(str) {
  return str + "TEST";
}

/*The second argument must be a function and it takes a string as input and return string as output
 */
jsonash.formatKeys(obj, customMethod);

/*
Output: 
{ first_nameTEST: "John", last_nameTEST: "John", phone_numberTEST: 999555 },
*/

/* You can pass array of objects to the method */

const objArray = [
  { first_name: "John", last_name: "John", phone_number: 999555 },
  { first_name: "Mike", last_name: "Mike", phone_number: 123 },
  { first_name: "Michael", last_name: "Michael", phone_number: 456 },
  { user: { first_name: "Alice", last_name: "Alice", phone_number: 789 } },
];
jsonash.formatKeys(objArray, customMethod);

/*
Output:
[
    { first_nameTEST: "John", last_nameTEST: "John", phone_numberTEST: 999555 },
    { first_nameTEST: 'Mike', last_nameTEST: 'Mike', phone_numberTEST: 123 },
    { first_nameTEST: 'Michael', last_nameTEST: 'Michael', phone_numberTEST: 456 },
    { userTEST: { first_nameTEST: 'Alice', last_nameTEST: 'Alice', phone_numberTEST: 789 } }
];
*/
```

### 6. To replace a key from the object

```javascript
const obj = {
  first_name: "John",
  last_name: "John",
  phone_number: 999555,
};
jsonash.replacetKeys(obj, "phone_number", "mobile_number");

/*
Output: 
{ first_name: 'John', last_name: 'John', mobile_number: 999555 }
*/

/* You can pass array of objects or and nested objects to the method */

const objArray = [
  { first_name: "John", last_name: "John", phone_number: 999555 },
  { first_name: "Mike", last_name: "Mike", phone_number: 123 },
  { first_name: "Michael", last_name: "Michael", phone_number: 456 },
  { user: { first_name: "Alice", last_name: "Alice", phone_number: 789 } },
];
jsonash.toCamelCase(objArray);

/*
Output:
[
  { first_name: 'John', last_name: 'John', mobile_number: 999555 },
  { first_name: 'Mike', last_name: 'Mike', mobile_number: 123 },
  { first_name: 'Michael', last_name: 'Michael', mobile_number: 456 },
  {
    user: { first_name: 'Alice', last_name: 'Alice', mobile_number: 789 }
  }
]
*/
```

### 7. To validate a JSON object

```javascript
const obj = { last_name: '12345', phone_number: 999555, is_admin: 'true' };
const options = {
    rules: {
        first_name: {
            type: "string",
            max: 5,
            min: 2,
            required: true
        },
        last_name: {
            type: "string",
            max: 4,
            min: 3
        },
        is_admin: {
            type: 'boolean'
        }
    }
}
If the JSON is valid return true or get a response object with error messages corresponding to each field.
/*
Output:
{
  first_name: [ 'required' ],
  last_name: [ 'last_name must contain a maximum of 4 characters.' ],
  is_admin: [ 'is_admin must be of type boolean' ],
  error: true
}
*/

```
