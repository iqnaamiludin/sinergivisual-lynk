export type BlockType = "link" | "product" | "video" | "header";

export type SocialPlatform =
  | "instagram"
  | "youtube"
  | "tiktok"
  | "behance"
  | "github"
  | "whatsapp"
  | "email"
  | "linkedin"
  | "twitter"
  | "website";

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  url: string;
  active: boolean;
}

export interface BlockItem {
  id: string;
  type: BlockType;
  title: string;
  url: string;
  subtitle?: string;
  badgeText?: string;
  active: boolean;
  thumbnail?: string;
  icon?: string;
  clicks: number;
  // Digital Product specific
  price?: string;
  originalPrice?: string;
  fileType?: string;
  downloadUrl?: string;
  description?: string;
  tags?: string[];
  // Video specific
  videoUrl?: string;
  videoProvider?: "youtube" | "vimeo" | "custom";
  videoAspectRatio?: "16:9" | "9:16" | "1:1";
  // Header specific
  headerStyle?: "simple" | "accent" | "divider";
}

export type ButtonStyleType =
  | "rounded-xl"
  | "rounded-full"
  | "rounded-2xl"
  | "hard-shadow"
  | "glass"
  | "outline"
  | "minimal";

export type ButtonHoverEffectType =
  | "scale"
  | "glow"
  | "lift"
  | "subtle";

export type AvatarStyleType =
  | "gradient-ring"
  | "glow-badge"
  | "square-curved"
  | "minimal";

export type SocialStyleType =
  | "circle-buttons"
  | "pill-bar"
  | "minimal-clean";

export type CardFrameStyleType =
  | "glass-card"
  | "minimal-border"
  | "flat-borderless";

export type FontFamilyType =
  | "inter"
  | "jakarta"
  | "poppins"
  | "outfit"
  | "space";

export interface ThemeConfig {
  presetId: string;
  name: string;
  bgType: "solid" | "gradient" | "mesh" | "dark-glow";
  bgColor: string;
  bgGradient: string;
  bgPattern?: "dots" | "grid" | "none";
  customBgImage?: string;
  buttonStyle: ButtonStyleType;
  buttonHoverEffect: ButtonHoverEffectType;
  avatarStyle: AvatarStyleType;
  socialStyle: SocialStyleType;
  cardFrameStyle: CardFrameStyleType;
  buttonBg: string;
  buttonTextColor: string;
  buttonBorderColor?: string;
  textColor: string;
  subtextColor: string;
  fontFamily: FontFamilyType;
  accentColor: string;
  cardOpacity: number;
}

export interface ProfileData {
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  verified: boolean;
  badgeText?: string;
  location?: string;
  socialLinks: SocialLink[];
  showWatermark: boolean;
}

export interface BuilderState {
  profile: ProfileData;
  theme: ThemeConfig;
  blocks: BlockItem[];
  activeTab: "blocks" | "theme" | "profile" | "preview";
  previewDevice: "mobile" | "desktop";
  selectedBlockId: string | null;
  // Actions
  setActiveTab: (tab: "blocks" | "theme" | "profile" | "preview") => void;
  setPreviewDevice: (device: "mobile" | "desktop") => void;
  setSelectedBlockId: (id: string | null) => void;
  // Block actions
  addBlock: (type: BlockType, template?: Partial<BlockItem>) => void;
  updateBlock: (id: string, data: Partial<BlockItem>) => void;
  removeBlock: (id: string) => void;
  toggleBlockActive: (id: string) => void;
  duplicateBlock: (id: string) => void;
  reorderBlocks: (activeId: string, overId: string) => void;
  incrementBlockClick: (id: string) => void;
  // Profile actions
  updateProfile: (data: Partial<ProfileData>) => void;
  updateSocialLink: (id: string, data: Partial<SocialLink>) => void;
  addSocialLink: (platform: SocialPlatform, url?: string) => void;
  removeSocialLink: (id: string) => void;
  // Theme actions
  updateTheme: (data: Partial<ThemeConfig>) => void;
  applyPreset: (presetId: string) => void;
  // General actions
  resetToDefault: () => void;
}
