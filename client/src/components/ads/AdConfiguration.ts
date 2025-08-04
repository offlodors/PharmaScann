// Ad slot configuration for different placements
export const AD_SLOTS = {
  // Header banner ad (top of page)
  HEADER_BANNER: "1234567890",
  
  // Results page ad (after analysis)
  RESULTS_BANNER: "1234567891", 
  
  // Sidebar ad (desktop)
  SIDEBAR_RECTANGLE: "1234567892",
  
  // Footer ad (bottom of page)
  FOOTER_BANNER: "1234567893",
  
  // In-content ad (between sections)
  IN_CONTENT: "1234567894",
  
  // Mobile banner (mobile only)
  MOBILE_BANNER: "1234567895"
};

// Revenue optimization strategy
export const AD_PLACEMENT_STRATEGY = {
  // High-value placements for maximum revenue
  HIGH_VALUE: [
    'RESULTS_BANNER', // Users see after successful scan
    'HEADER_BANNER'   // Always visible
  ],
  
  // Medium-value placements
  MEDIUM_VALUE: [
    'IN_CONTENT',     // Between content sections
    'SIDEBAR_RECTANGLE'
  ],
  
  // Lower-value but good for frequency
  LOW_VALUE: [
    'FOOTER_BANNER',
    'MOBILE_BANNER'
  ]
};

export default AD_SLOTS;