import { IoT } from "../IoT";
import { IoTClient } from "../IoTClient";
import {
  ListOutgoingCertificatesCommand,
  ListOutgoingCertificatesCommandInput,
  ListOutgoingCertificatesCommandOutput,
} from "../commands/ListOutgoingCertificatesCommand";
import { IoTPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";

const makePagedClientRequest = async (
  client: IoTClient,
  input: ListOutgoingCertificatesCommandInput,
  ...args: any
): Promise<ListOutgoingCertificatesCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListOutgoingCertificatesCommand(input), ...args);
};
const makePagedRequest = async (
  client: IoT,
  input: ListOutgoingCertificatesCommandInput,
  ...args: any
): Promise<ListOutgoingCertificatesCommandOutput> => {
  // @ts-ignore
  return await client.listOutgoingCertificates(input, ...args);
};
export async function* listOutgoingCertificatesPaginate(
  config: IoTPaginationConfiguration,
  input: ListOutgoingCertificatesCommandInput,
  ...additionalArguments: any
): Paginator<ListOutgoingCertificatesCommandOutput> {
  let token: string | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListOutgoingCertificatesCommandOutput;
  while (hasNext) {
    input.marker = token;
    input["pageSize"] = config.pageSize;
    if (config.client instanceof IoT) {
      page = await makePagedRequest(config.client, input, ...additionalArguments);
    } else if (config.client instanceof IoTClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected IoT | IoTClient");
    }
    yield page;
    token = page.nextMarker;
    hasNext = !!token;
  }
  // @ts-ignore
  return undefined;
}
