import { IoT } from "../IoT";
import { IoTClient } from "../IoTClient";
import {
  ListMitigationActionsCommand,
  ListMitigationActionsCommandInput,
  ListMitigationActionsCommandOutput,
} from "../commands/ListMitigationActionsCommand";
import { IoTPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";

const makePagedClientRequest = async (
  client: IoTClient,
  input: ListMitigationActionsCommandInput,
  ...args: any
): Promise<ListMitigationActionsCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListMitigationActionsCommand(input), ...args);
};
const makePagedRequest = async (
  client: IoT,
  input: ListMitigationActionsCommandInput,
  ...args: any
): Promise<ListMitigationActionsCommandOutput> => {
  // @ts-ignore
  return await client.listMitigationActions(input, ...args);
};
export async function* listMitigationActionsPaginate(
  config: IoTPaginationConfiguration,
  input: ListMitigationActionsCommandInput,
  ...additionalArguments: any
): Paginator<ListMitigationActionsCommandOutput> {
  let token: string | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListMitigationActionsCommandOutput;
  while (hasNext) {
    input.nextToken = token;
    input["maxResults"] = config.pageSize;
    if (config.client instanceof IoT) {
      page = await makePagedRequest(config.client, input, ...additionalArguments);
    } else if (config.client instanceof IoTClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected IoT | IoTClient");
    }
    yield page;
    token = page.nextToken;
    hasNext = !!token;
  }
  // @ts-ignore
  return undefined;
}
