const constants = require('./helpers/constants')
const test = require('ava')
const { compare, compareUnsorted } = require('../')

test('array of same dates', t => {
  t.true(compareUnsorted([new Date('Tue Mar 24 2015 20:00:00 GMT-0400')], [new Date('Tue Mar 24 2015 20:00:00 GMT-0400')]))
})

test('array of dissimilar dates', t => {
  t.false(compareUnsorted([new Date('Tue Mar 24 2015 20:00:00 GMT-0400')], [new Date('Tue Mar 24 2017 20:00:00 GMT-0400')]))
})

test('array of date and non date', t => {
  t.false(compareUnsorted([new Date('Tue Mar 24 2015 20:00:00 GMT-0400')], [1]))
})

test('does not mutate original date arrays', t => {
  let a = [new Date('Tue Mar 24 2015 20:00:00 GMT-0400')]
  let aOriginal = [new Date('Tue Mar 24 2015 20:00:00 GMT-0400')]
  compareUnsorted([a], [a])
  t.deepEqual(a, aOriginal)
})

test('same regexp', t => {
  t.true(compareUnsorted([new RegExp('ab+c'), new RegExp('ab+d')], [new RegExp('ab+d'), new RegExp('ab+c')]))
})

test('should fail with different regexps', t => {
  t.false(compareUnsorted([new RegExp('ab+c'), new RegExp('ab+c')], [new RegExp('ab+c'), new RegExp('ab-c')]))
})