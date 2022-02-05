import { DynamoDB } from 'aws-sdk'
const endpoint = process.env.STAGE === 'local' ? { endpoint: 'http://localhost:8000' } : {}
const dynamoDb = new DynamoDB.DocumentClient(endpoint)

export type CrudResponse = { json: any, status: number }
export const getAll = async (attr: string, val: string | number, tablePrefix?: string): Promise<CrudResponse> => {
  const params = {
    TableName: `${tablePrefix ? process.env.DYNAMODB_TABLE + tablePrefix : process.env.DYNAMODB_TABLE}`,
    FilterExpression: `contains(${attr},:key)`,
    ExpressionAttributeValues: {
      ':key': val,
    },
  };
  let res = { json: {}, status: 200 };
  try {
    res.json = (await dynamoDb.scan(params).promise()).Items;
  } catch (err) {
    const error = new Error(err)
    res = { json: { error }, status: 500 }
  }
  return res
}

export const getSingle = async (id: string | number, tablePrefix?: string): Promise<CrudResponse> => {
  const params = {
    TableName: `${tablePrefix ? process.env.DYNAMODB_TABLE + tablePrefix : process.env.DYNAMODB_TABLE}`,
    Key: {
      pk: id,
    }
  };

  let res = { json: {}, status: 200 };
  try {
    res.json = (await dynamoDb.get(params).promise()).Item;
  } catch (err) {
    const error = new Error(err)
    res = { json: { error }, status: 500 }
  }
  return res
}


export const postSingle = async (Item: any, tablePrefix?: string): Promise<CrudResponse> => {
  const params = {
    TableName: `${tablePrefix ? process.env.DYNAMODB_TABLE + tablePrefix : process.env.DYNAMODB_TABLE}`,
    Item,
  }
  let res = { json: {}, status: 201 };

  try {
    await dynamoDb.put(params).promise();
    res.json = Item;
  } catch (err) {
    const error = new Error(err)
    res = { json: { error }, status: 500 }
  }
  return res;
}

export const postBatch = async (RequestItems: any, tablePrefix?: string): Promise<CrudResponse> => {
  const params = {
    TableName: `${tablePrefix ? process.env.DYNAMODB_TABLE + tablePrefix : process.env.DYNAMODB_TABLE}`,
    RequestItems,
  }
  let res = { json: {}, status: 201 };

  try {
    await dynamoDb.batchWrite(params).promise();
    res.json = RequestItems;
  } catch (err) {
    const error = new Error(err)
    res = { json: { error }, status: 500 }
  }
  return res;
}

export const putSingle = async (pk: string, keyValArr: { key: string, val: any, alwaysUpdate?: boolean, isReservedKeyword?: boolean }[], tablePrefix?: string): Promise<CrudResponse> => {
  const updatedAttributes = [];
  const expressionAttributeValues: any = {};
  let expressionAttributeNames: any = null;


  keyValArr.map(attr => {
    if (attr.val || attr.alwaysUpdate) {
      if (attr.isReservedKeyword) {
        expressionAttributeNames = {}
        const tempKey = `:${attr.key.replace("#", "")}1`
        updatedAttributes.push(`${attr.key} = ${tempKey}`);
        expressionAttributeValues[`${tempKey}`] = attr.val;
        expressionAttributeNames[`${attr.key}`] = attr.key.replace("#", "");
      } else {
        updatedAttributes.push(`${attr.key} = :${attr.key}`);
        expressionAttributeValues[`:${attr.key}`] = attr.val;
      }
    }
  })

  updatedAttributes.push(`updated = :updated`);
  expressionAttributeValues[':updated'] = new Date().toISOString();
  const updateExpression = `set ${updatedAttributes.join(', ')}`;

  const p = {
    TableName: `${tablePrefix ? process.env.DYNAMODB_TABLE + tablePrefix : process.env.DYNAMODB_TABLE}`,
    Key: { pk },
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: 'ALL_NEW',
  };

  const params =
    expressionAttributeNames
      ? {
        ...p,
        ExpressionAttributeNames: expressionAttributeNames,
      }
      : p


  let res = { json: {}, status: 201 };

  try {
    const { Attributes } = await dynamoDb.update(params).promise()
    res.json = Attributes;
  } catch (err) {
    const error = new Error(err)
    res = { json: { error }, status: 500 }
  }
  return res;
}

export const deleteSingle = async (pk: string, tablePrefix?: string): Promise<CrudResponse> => {
  let result;
  const params = {
    TableName: `${tablePrefix ? process.env.DYNAMODB_TABLE + tablePrefix : process.env.DYNAMODB_TABLE}`,
    Key: {
      pk,
    }
  }

  let res = { json: {}, status: 201 };

  try {
    result = (await dynamoDb.get(params).promise()).Item;
    if (!result) {
      return res = { json: { error: 'すでに削除しました！' }, status: 500 }
    }
    await dynamoDb.delete(params).promise();
    res.json = { message: '正常に削除できました🚮' }
  } catch (err) {
    const error = new Error(err)
    res = { json: { error }, status: 500 }
  }
  return res;
}

// this request needs to make like this because it uses reserved attributes name
export const getAllUser = async (type: 'oauth' | 'SESSION' | 'USER' | ''): Promise<CrudResponse> => {
  const params = {
    TableName: `${process.env.DYNAMODB_TABLE}-user`,
    FilterExpression: `contains(#user_type,:key)`,
    ExpressionAttributeValues: {
      ':key': type,
    },
    ExpressionAttributeNames: {
      "#user_type": "type" // type is reserved name so we use #user_type as a temp subs for making a filter expression
    },
  };

  let res = { json: {}, status: 200 };
  try {
    res.json = (await dynamoDb.scan(params).promise()).Items;
  } catch (err) {
    const error = new Error(err)
    res = { json: { error }, status: 500 }
  }
  return res
}

// BECAUSE THIS REQUIRES in keys PK AND SK
export const putSingleUser = async (pk: string, sk: string, keyValArr: { key: string, val: any, alwaysUpdate?: boolean, isReservedKeyword?: boolean }[]): Promise<CrudResponse> => {
  const updatedAttributes = [];
  const expressionAttributeValues: any = {};
  let expressionAttributeNames: any = null;
  keyValArr.map(attr => {
    if (attr.val || attr.alwaysUpdate) {
      if (attr.isReservedKeyword) {
        expressionAttributeNames = {}
        const tempKey = `:${attr.key.replace("#", "")}1`
        updatedAttributes.push(`${attr.key} = ${tempKey}`);
        expressionAttributeValues[`${tempKey}`] = attr.val;
        expressionAttributeNames[`${attr.key}`] = attr.key.replace("#", "");
      } else {
        updatedAttributes.push(`${attr.key} = :${attr.key}`);
        expressionAttributeValues[`:${attr.key}`] = attr.val;
      }
    }
  })

  updatedAttributes.push(`updated = :updated`);
  expressionAttributeValues[':updated'] = new Date().toISOString();
  const updateExpression = `set ${updatedAttributes.join(', ')}`;

  const p = {
    TableName: `${process.env.DYNAMODB_TABLE}-user`,
    Key: {
      pk,
      sk
    },
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: 'ALL_NEW',
  };

  const params =
    expressionAttributeNames
      ? {
        ...p,
        ExpressionAttributeNames: expressionAttributeNames,
      }
      : p


  let res = { json: {}, status: 201 };

  try {
    const { Attributes } = await dynamoDb.update(params).promise()
    res.json = Attributes;
  } catch (err) {
    const error = new Error(err)
    res = { json: { error }, status: 500 }
  }
  return res;
}

export const deleteSingleUser = async (id: string): Promise<CrudResponse> => {
  let res = { json: {}, status: 201 };

  const user = (await getAll('id', id, '-user')).json[0]
  if (!user) {
    return res = { json: { error: 'すでに削除しました！' }, status: 500 }
  }
  const params = {
    TableName: `${process.env.DYNAMODB_TABLE}-user`,
    Key: {
      pk: user.pk,
      sk: user.sk
    }
  }


  try {
    console.log(params);
    await dynamoDb.delete(params).promise();
    res.json = { message: '正常に削除できました🚮' }
  } catch (err) {
    const error = new Error(err)
    res = { json: { error }, status: 500 }
  }
  return res;
}