import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  BlockItem,
  BlockType,
  BuilderState,
  ProfileData,
  SocialLink,
  SocialPlatform,
  ThemeConfig,
} from "@/types/builder";
import { DEFAULT_BLOCKS, DEFAULT_PROFILE, THEME_PRESETS } from "@/lib/constants";

const generateId = (prefix = "block") =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

export const useBuilderStore = create<BuilderState>()(
  persist(
    (set, get) => ({
      profile: DEFAULT_PROFILE,
      theme: THEME_PRESETS[0],
      blocks: DEFAULT_BLOCKS,
      activeTab: "blocks",
      previewDevice: "mobile",
      selectedBlockId: null,

      setActiveTab: (tab) => set({ activeTab: tab }),
      setPreviewDevice: (device) => set({ previewDevice: device }),
      setSelectedBlockId: (id) => set({ selectedBlockId: id }),

      addBlock: (type: BlockType, template?: Partial<BlockItem>) => {
        const newBlock: BlockItem = {
          id: generateId("block"),
          type,
          title: template?.title || (type === "header" ? "SECTION BARU" : "Judul Blok Baru"),
          url: template?.url || (type === "header" ? "" : "https://"),
          subtitle: template?.subtitle || "",
          active: true,
          clicks: 0,
          thumbnail: template?.thumbnail || "",
          icon: template?.icon || (type === "link" ? "Link2" : type === "product" ? "Sparkles" : type === "video" ? "PlayCircle" : "Heading"),
          // Product specifics
          price: template?.price || (type === "product" ? "FREE" : undefined),
          originalPrice: template?.originalPrice || (type === "product" ? "Rp 99.000" : undefined),
          fileType: template?.fileType || (type === "product" ? "ZIP • 50 MB" : undefined),
          downloadUrl: template?.downloadUrl || (type === "product" ? "https://example.com/asset.zip" : undefined),
          description: template?.description || (type === "product" ? "Aset digital gratis untuk kebutuhan editing Anda." : undefined),
          tags: template?.tags || (type === "product" ? ["Video Asset", "Free"] : undefined),
          // Video specifics
          videoUrl: template?.videoUrl || (type === "video" ? "https://www.youtube.com/watch?v=dQw4w9WgXcQ" : undefined),
          videoProvider: template?.videoProvider || (type === "video" ? "youtube" : undefined),
          videoAspectRatio: template?.videoAspectRatio || (type === "video" ? "16:9" : undefined),
          // Header specifics
          headerStyle: template?.headerStyle || (type === "header" ? "accent" : undefined),
        };

        set((state) => ({
          blocks: [newBlock, ...state.blocks],
          selectedBlockId: newBlock.id,
        }));
      },

      updateBlock: (id: string, data: Partial<BlockItem>) => {
        set((state) => ({
          blocks: state.blocks.map((block) =>
            block.id === id ? { ...block, ...data } : block
          ),
        }));
      },

      removeBlock: (id: string) => {
        set((state) => ({
          blocks: state.blocks.filter((block) => block.id !== id),
          selectedBlockId: state.selectedBlockId === id ? null : state.selectedBlockId,
        }));
      },

      toggleBlockActive: (id: string) => {
        set((state) => ({
          blocks: state.blocks.map((block) =>
            block.id === id ? { ...block, active: !block.active } : block
          ),
        }));
      },

      duplicateBlock: (id: string) => {
        const { blocks } = get();
        const blockIndex = blocks.findIndex((b) => b.id === id);
        if (blockIndex === -1) return;

        const targetBlock = blocks[blockIndex];
        const duplicatedBlock: BlockItem = {
          ...targetBlock,
          id: generateId("block"),
          title: `${targetBlock.title} (Copy)`,
          clicks: 0,
        };

        const updated = [...blocks];
        updated.splice(blockIndex + 1, 0, duplicatedBlock);
        set({ blocks: updated, selectedBlockId: duplicatedBlock.id });
      },

      reorderBlocks: (activeId: string, overId: string) => {
        if (activeId === overId) return;
        set((state) => {
          const oldIndex = state.blocks.findIndex((b) => b.id === activeId);
          const newIndex = state.blocks.findIndex((b) => b.id === overId);
          if (oldIndex === -1 || newIndex === -1) return state;

          const newBlocks = [...state.blocks];
          const [movedItem] = newBlocks.splice(oldIndex, 1);
          newBlocks.splice(newIndex, 0, movedItem);

          return { blocks: newBlocks };
        });
      },

      incrementBlockClick: (id: string) => {
        set((state) => ({
          blocks: state.blocks.map((block) =>
            block.id === id ? { ...block, clicks: (block.clicks || 0) + 1 } : block
          ),
        }));
      },

      updateProfile: (data: Partial<ProfileData>) => {
        set((state) => ({
          profile: { ...state.profile, ...data },
        }));
      },

      updateSocialLink: (id: string, data: Partial<SocialLink>) => {
        set((state) => ({
          profile: {
            ...state.profile,
            socialLinks: state.profile.socialLinks.map((link) =>
              link.id === id ? { ...link, ...data } : link
            ),
          },
        }));
      },

      addSocialLink: (platform: SocialPlatform, url = "") => {
        const newSocial: SocialLink = {
          id: generateId("soc"),
          platform,
          url: url || `https://${platform}.com/`,
          active: true,
        };

        set((state) => ({
          profile: {
            ...state.profile,
            socialLinks: [...state.profile.socialLinks, newSocial],
          },
        }));
      },

      removeSocialLink: (id: string) => {
        set((state) => ({
          profile: {
            ...state.profile,
            socialLinks: state.profile.socialLinks.filter((link) => link.id !== id),
          },
        }));
      },

      updateTheme: (data: Partial<ThemeConfig>) => {
        set((state) => ({
          theme: { ...state.theme, ...data },
        }));
      },

      applyPreset: (presetId: string) => {
        const preset = THEME_PRESETS.find((p) => p.presetId === presetId);
        if (preset) {
          set({ theme: preset });
        }
      },

      resetToDefault: () => {
        set({
          profile: DEFAULT_PROFILE,
          theme: THEME_PRESETS[0],
          blocks: DEFAULT_BLOCKS,
          selectedBlockId: null,
        });
      },
    }),
    {
      name: "sinergi-visual-lynk-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        profile: state.profile,
        theme: state.theme,
        blocks: state.blocks,
      }),
    }
  )
);
