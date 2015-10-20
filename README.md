[![Build Status](https://api.travis-ci.org/meilke/word-count-stream.png)](https://travis-ci.org/meilke/word-count-stream)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)  
[![Code Climate](https://codeclimate.com/github/meilke/word-count-stream/badges/gpa.svg)](https://codeclimate.com/github/meilke/word-count-stream)
[![Test Coverage](https://codeclimate.com/github/meilke/word-count-stream/badges/coverage.svg)](https://codeclimate.com/github/meilke/word-count-stream/coverage)  
[![forthebadge](http://forthebadge.com/images/badges/uses-badges.svg)](http://forthebadge.com)

# word-count-stream

Counts the words in a stream.

## Setup

`npm install`

## Tests

1. `npm install -g grunt-cli`
2. `grunt`

## From a file off the interwebs

`node index.js --url=http://textfiles.com/etext/REFERENCE/john-magna-413.txt`

## Random data from random.org

`node index.js --randomOrg --size=4096`

## More options

Enable forced garbage collection per each stream read by passing `--expose-gc` to allow for more efficient processing.

Set the chunk size per each stream read by passing `--atOnce=<your_number_goes_here>`.

Set the word separator by passing `--separator=<your_separator>`.