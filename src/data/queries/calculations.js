/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import { GraphQLObjectType as ObjectType, GraphQLString as StringType, GraphQLFloat as FloatType } from 'graphql';
import CalculationType from '../types/CalculationType';

const calculations = {
  type: CalculationType,
  args: {
    expression: {
      type : StringType,
    },
  },
  resolve({ request }, args) {
    var result = null;
    try {
      result = `${ args.expression }=${ eval(args.expression) }`;
    }
    catch (err) {
      result = err.message;
    }

  	return {
      result
    };
  },
};

export default calculations;
