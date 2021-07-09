import { GraphQLScalarType, Kind } from "graphql";
import { PointType } from "../../../src/models/enums";

export const pointTypeScalar = new GraphQLScalarType({
  name: "PointType",
  description: "Point type custom scalar type",
  serialize(value) {
    return value;
  },
  parseValue(value) {
    return PointType[value];
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return PointType[parseInt(ast.value)];
    }
    return null;
  },
});
