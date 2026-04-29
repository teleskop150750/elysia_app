import "@typespec/http";
import "@typespec/openapi3";

using Http;

@service(#{ title: "ACRM API" })
namespace AcrmApi;

model SuccessResponse {
  success: boolean;
}

model BasePagination {
  total: int32;
  per_page: int32;
  current_page: int32;
  last_page: int32;
  from: int32;
  to: int32;
}

model Workspace {
  id: string;
  name: string;
  disabled: boolean;
  parent_id: string | null;
}

model Operator {
  id: string;
  name: string;
}

model PipelineStatus {
  id: string;
  label: string;
  color: string;
  disabled: boolean;
  parent_id: string | null;
}

model Region {
  id: string;
  name: string;
}

model Source {
  id: string;
  name: string;
}

model CustomerPhone {
  id: string;
  label: string;
}

model Customer {
  id: string;
  name: string | null;
  rating: float64 | null;
  region_id: string | null;
  region: Region | null;
  phones: CustomerPhone[];
}

model Offer {
  id: string;
  name: string;
}

model Vehicle {
  id: string;
  make: string;
  "model": string;
  year: int32;
}

model PipelineTag {
  id: string;
  label: string;
}

model Pipeline {
  id: string;
  active_pipeline_id: string | null;
  is_spam: boolean;
  is_captcha: boolean;
  status_id: string;
  status: PipelineStatus;
  operator_id: string;
  operator: Operator;
  customer_id: string;
  customer: Customer;
  tag_list: PipelineTag[];
  sale_type: string | null;
  trade_in: boolean | null;
  disposal: boolean | null;
  lead_type: string | null;
  source_id: string | null;
  source: Source | null;
  ad_url: string | null;
  ad_external_id: string | null;
  target_vehicle_id: string | null;
  target_vehicle: Offer | null;
  desired_vehicle_id: string | null;
  desired_vehicle: Vehicle | null;
  sold_vehicle_id: string | null;
  sold_vehicle: Vehicle | null;
  advertised_price: float64 | null;
  desired_price: float64 | null;
  catalog_price_at_sale: float64 | null;
  selling_price: float64 | null;
  call_at: string | null;
  visit_at: string | null;
  closed_at: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

model Me {
  id: string;
  email: string;
  name: string;
}

model SessionCreateRequest {
  email: string;
  password: string;
}

model WorkspaceListResponse {
  success: boolean;
  data: Workspace[];
}

model WorkspacesSettingsTreeBranch {
  id: string;
  treeType: "branch";
  parent_id: string | null;
  label: string;
}

model WorkspacesSettingsTreeLeaf {
  id: string;
  treeType: "leaf";
  parent_id: string | null;
  label: string;
  value: string;
}

model WorkspacesSettingsReportSettings {
  dimension_list: (WorkspacesSettingsTreeBranch | WorkspacesSettingsTreeLeaf)[];
  metric_list: (WorkspacesSettingsTreeBranch | WorkspacesSettingsTreeLeaf)[];
}

model WorkspacesSettingsData {
  source_list: Source[];
  region_list: Region[];
  pipeline_tag_list: PipelineTag[];
  pipeline_status_list: PipelineStatus[];
  report_settings: WorkspacesSettingsReportSettings;
}

model WorkspacesSettingsResponse {
  success: boolean;
  data: WorkspacesSettingsData;
}

model CustomersListResponse {
  success: boolean;
  data: Customer[];
}

model HandsetOwner {
  id: numeric;
  name: string;
}

model Handset {
  id: string;
  owner: HandsetOwner | null;
}

model HandsetListResponse {
  success: boolean;
  data: Handset[];
}

model CurrentHandsetData {
  id?: string | null;
}

model CurrentHandsetResponse {
  success: boolean;
  data: CurrentHandsetData;
}

model ListRequest {
  search?: string | null;
  filters?: Record<unknown> | null;
  pagination?: {
    current_page: int32;
    per_page: int32;
  };
}

model VehiclesListResponse {
  success: boolean;
  data: null;
  pagination: BasePagination;
}

model VehiclesFilterOptionsResponse {
  success: boolean;
  data: null;
}

model OffersListResponse {
  success: boolean;
  data: null;
  pagination: BasePagination;
}

model OffersFilterOptionsResponse {
  success: boolean;
  data: null;
}

model PipelineCategoryRequest {
  search?: string | null;
  category?:
    | "hot"
    | "new_no_answer"
    | "burned_my"
    | "burned"
    | "urgent"
    | "visit_today"
    | "visit_tomorrow"
    | null;
  metric?: string | null;
  dimensions?: {
    key: string;
    value: string;
  }[] | null;
  filters?: Record<unknown> | null;
  pagination?: {
    current_page: int32;
    per_page: int32;
  };
}

model PipelineListItem extends OmitProperties<Pipeline, "tag_list" | "sale_type" | "trade_in" | "disposal"> {
  comment: string | null;
}

model PipelineListResponse {
  success: boolean;
  data: PipelineListItem[];
  pagination: BasePagination;
}

model PipelineReportRequest {
  metrics: string[];
  dimensions: string[];
}

model PipelineReportGroupingItem {
  id: string;
  label: string;
  value: unknown;
}

model PipelineReportMetricItem {
  id: string;
  value: float64;
}

model PipelineReportItem {
  groupings: Record<PipelineReportGroupingItem>;
  metrics: Record<PipelineReportMetricItem>;
}

model PipelineReportResponse {
  success: boolean;
  data: PipelineReportItem[];
}

model PipelineMetricTrendRequest {
  periodGroup: string;
  metric: string[];
  dimensions: string[];
}

model PipelineMetricTrendItem {
  datetime: string;
  groupings: Record<PipelineReportGroupingItem>;
  metrics: Record<PipelineReportMetricItem>;
}

model PipelineMetricTrendResponse {
  success: boolean;
  data: PipelineMetricTrendItem[];
}

model PipelineFilterDimension {
  id: string;
  value: string;
}

model PipelineFilterOptionsRequest {
  search?: string | null;
  category?:
    | "hot"
    | "new_no_answer"
    | "burned_my"
    | "burned"
    | "urgent"
    | "visit_today"
    | "visit_tomorrow"
    | null;
  metric?: string | null;
  dimensions?: PipelineFilterDimension[] | null;
  filters?: Record<unknown> | null;
  pagination?: {
    current_page: int32;
    per_page: int32;
  };
}

model PipelineFilterOptionsResponse {
  success: boolean;
  data: null;
}

model PipelineOther {
  id: string;
  status_id: string;
}

model PipelineGetData extends Pipeline {
  other_pipeline_list: PipelineOther[];
}

model PipelineGetResponse {
  success: boolean;
  data: PipelineGetData;
}

model PipelineCustomerUpdateRequest {
  id: string;
}

model PipelineFeedCommentPayload {
  text: string;
}

model PipelineFeedComment {
  id: string;
  type: "comment";
  operator?: Operator | null;
  pyaload: PipelineFeedCommentPayload;
  order_id: float64;
  created_at: string;
}

model PipelineCustomerFeedResponse {
  success: boolean;
  data: PipelineFeedComment[];
}

model PipelineFeedCreateRequestComment {
  type: "comment";
  pyaload: PipelineFeedCommentPayload;
}

model MeResponse {
  success: boolean;
  data: Me;
}

@route("/api/v2")
interface Api {
  @tag("Sessions")
  @post
  @route("/me/get")
  getMe(): MeResponse;

  @tag("Sessions")
  @post
  @route("/current-session/create")
  createCurrentSession(@body body: SessionCreateRequest): SuccessResponse;

  @tag("Sessions")
  @delete
  @route("/current-session/delete")
  deleteCurrentSession(): SuccessResponse;

  @tag("Workspaces")
  @post
  @route("/workspace-list/get")
  getWorkspaceList(): WorkspaceListResponse;

  @tag("Workspaces")
  @post
  @route("/workspace/{workspaceId}/settings/get")
  getWorkspaceSettings(@path workspaceId: string): WorkspacesSettingsResponse;

  @tag("Customers")
  @post
  @route("/workspace/{workspaceId}/customer-list/get")
  getCustomerList(@path workspaceId: string): CustomersListResponse;

  @tag("Handsets")
  @post
  @route("/workspace/{workspaceId}/handset-list/get")
  getHandsetList(@path workspaceId: string): HandsetListResponse;

  @tag("Handsets")
  @put
  @route("/workspace/{workspaceId}/handset/{handsetId}/owner/update")
  updateHandsetOwner(@path workspaceId: string, @path handsetId: string): SuccessResponse;

  @tag("Handsets")
  @post
  @route("/workspace/{workspaceId}/current-handset/get")
  getCurrentHandset(@path workspaceId: string): CurrentHandsetResponse;

  @tag("Handsets")
  @delete
  @route("/workspace/{workspaceId}/current-handset/delete")
  deleteCurrentHandset(@path workspaceId: string): SuccessResponse;

  @tag("Vehicles")
  @post
  @route("/workspace/{workspaceId}/vehicle-list/get")
  getVehicleList(@path workspaceId: string, @body body: ListRequest): VehiclesListResponse;

  @tag("Vehicles")
  @post
  @route("/workspace/{workspaceId}/car-list/filter-options/get")
  getVehicleFilterOptions(@path workspaceId: string): VehiclesFilterOptionsResponse;

  @tag("Offers")
  @post
  @route("/workspace/{workspaceId}/offer-list/get")
  getOfferList(@path workspaceId: string, @body body: ListRequest): OffersListResponse;

  @tag("Offers")
  @post
  @route("/workspace/{workspaceId}/offer-list/filter-options/get")
  getOfferFilterOptions(@path workspaceId: string): OffersFilterOptionsResponse;

  @tag("Pipelines")
  @post
  @route("/workspace/{workspaceId}/pipeline-list/get")
  getPipelineList(@path workspaceId: string, @body body: PipelineCategoryRequest): PipelineListResponse;

  @tag("Pipelines")
  @post
  @route("/workspace/{workspaceId}/pipeline-list/report/get")
  getPipelineReport(@path workspaceId: string, @body body: PipelineReportRequest): PipelineReportResponse;

  @tag("Pipelines")
  @post
  @route("/workspace/{workspaceId}/pipeline-list/metric-trend/get")
  getPipelineMetricTrend(
    @path workspaceId: string,
    @body body: PipelineMetricTrendRequest,
  ): PipelineMetricTrendResponse;

  @tag("Pipelines")
  @post
  @route("/workspace/{workspaceId}/pipeline-list/filter-options/get")
  getPipelineFilterOptions(
    @path workspaceId: string,
    @body body?: PipelineFilterOptionsRequest,
  ): PipelineFilterOptionsResponse;

  @tag("Pipelines")
  @post
  @route("/workspace/{workspaceId}/pipeline/{pipelineId}/get")
  getPipeline(@path workspaceId: string, @path pipelineId: string): PipelineGetResponse;

  @tag("Pipelines")
  @put
  @route("/workspace/{workspaceId}/pipeline/{pipelineId}/customer/update")
  updatePipelineCustomer(
    @path workspaceId: string,
    @path pipelineId: string,
    @body body: PipelineCustomerUpdateRequest,
  ): SuccessResponse;

  @tag("Pipelines")
  @post
  @route("/workspace/{workspaceId}/pipeline/{pipelineId}/customer/feed/get")
  getPipelineCustomerFeed(
    @path workspaceId: string,
    @path pipelineId: string,
  ): PipelineCustomerFeedResponse;

  @tag("Pipelines")
  @post
  @route("/workspace/{workspaceId}/pipeline/{pipelineId}/feed/create")
  createPipelineFeed(
    @path workspaceId: string,
    @path pipelineId: string,
    @body body: PipelineFeedCreateRequestComment,
  ): SuccessResponse;
}
