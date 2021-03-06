import { ConfigServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ConfigServiceClient";
import {
  DescribeOrganizationConformancePackStatusesRequest,
  DescribeOrganizationConformancePackStatusesResponse,
} from "../models/models_0";
import {
  deserializeAws_json1_1DescribeOrganizationConformancePackStatusesCommand,
  serializeAws_json1_1DescribeOrganizationConformancePackStatusesCommand,
} from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { HttpRequest as __HttpRequest, HttpResponse as __HttpResponse } from "@aws-sdk/protocol-http";
import { Command as $Command } from "@aws-sdk/smithy-client";
import {
  FinalizeHandlerArguments,
  Handler,
  HandlerExecutionContext,
  MiddlewareStack,
  HttpHandlerOptions as __HttpHandlerOptions,
  MetadataBearer as __MetadataBearer,
  SerdeContext as __SerdeContext,
} from "@aws-sdk/types";

export type DescribeOrganizationConformancePackStatusesCommandInput = DescribeOrganizationConformancePackStatusesRequest;
export type DescribeOrganizationConformancePackStatusesCommandOutput = DescribeOrganizationConformancePackStatusesResponse &
  __MetadataBearer;

export class DescribeOrganizationConformancePackStatusesCommand extends $Command<
  DescribeOrganizationConformancePackStatusesCommandInput,
  DescribeOrganizationConformancePackStatusesCommandOutput,
  ConfigServiceClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: DescribeOrganizationConformancePackStatusesCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: ConfigServiceClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<
    DescribeOrganizationConformancePackStatusesCommandInput,
    DescribeOrganizationConformancePackStatusesCommandOutput
  > {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "ConfigServiceClient";
    const commandName = "DescribeOrganizationConformancePackStatusesCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: DescribeOrganizationConformancePackStatusesRequest.filterSensitiveLog,
      outputFilterSensitiveLog: DescribeOrganizationConformancePackStatusesResponse.filterSensitiveLog,
    };

    if (typeof logger.info === "function") {
      logger.info({
        clientName,
        commandName,
      });
    }

    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: DescribeOrganizationConformancePackStatusesCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_json1_1DescribeOrganizationConformancePackStatusesCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<DescribeOrganizationConformancePackStatusesCommandOutput> {
    return deserializeAws_json1_1DescribeOrganizationConformancePackStatusesCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
