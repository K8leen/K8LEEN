/** Позиции точек (% от viewBox) для overlay на планшете — img + HTML dots */

export const FOOD_TECH_INTERFACE_CLIENT_DOT_POSITIONS = {
  continuous_feed_structure: { x: 4.05, y: 71.83 },
  content_category_navigation: { x: 3.45, y: 21.55 },
  contextual_entity_header: { x: 38.02, y: 24.2 },
  unified_search_entry: { x: 49.05, y: 22.31 },
  order_status_tracking: { x: 81.81, y: 21.74 },
  order_history_memory: { x: 96.12, y: 21.17 },
  incremental_order_builder: { x: 21.38, y: 63.71 },
  promotional_content_block: { x: 23.19, y: 68.62 },
  product_card_pattern: { x: 39.05, y: 58.79 },
  checkout_decision_flow: { x: 50, y: 43.48 },
  post_order_feedback_loop: { x: 62.84, y: 53.12 },
  persistent_navigation: { x: 84.14, y: 66.35 },
  repeat_order_pattern: { x: 88.62, y: 57.09 },
  quick_quantity_control: { x: 90.69, y: 64.65 },
  cross_sell_pattern: { x: 63.45, y: 34.59 },
};

export const FOOD_TECH_INTERFACE_RESTAURANT_DOT_POSITIONS = {
  navigation_shell: { x: 2.93, y: 57.5 },
  global_search: { x: 25.6, y: 15.45 },
  category_filter_system: { x: 11.29, y: 21.99 },
  dense_grid_layout: { x: 13.88, y: 66.27 },
  bulk_management_entry: { x: 41.47, y: 26.45 },
  dashboard_summary_pattern: { x: 47.41, y: 41.9 },
  visual_data_grouping: { x: 60.34, y: 74.44 },
  time_filter_pattern: { x: 40.78, y: 89.6 },
  feedback_integration: { x: 66.47, y: 37 },
  status_management_system: { x: 85.17, y: 19.17 },
  order_queue_pattern: { x: 80.52, y: 40.12 },
  priority_visualization: { x: 97.5, y: 19.02 },
  product_card_pattern_rest: { x: 19.31, y: 53.19 },
};

export const FOOD_TECH_INTERFACE_PART_DOT_POSITIONS = [
  FOOD_TECH_INTERFACE_CLIENT_DOT_POSITIONS,
  FOOD_TECH_INTERFACE_RESTAURANT_DOT_POSITIONS,
];
