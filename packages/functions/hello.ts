type Response = {
  hello: string;
}

export async function handler(): Promise<Response> {
  return {
    hello: 'world'
  }
}