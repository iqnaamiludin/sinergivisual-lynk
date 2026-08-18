"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useBuilderStore } from "@/stores/use-builder-store";
import { BlockItemComponent } from "./block-item";
import { AddBlockModal } from "./add-block-modal";
import { BlockType } from "@/types/builder";
import {
  Plus,
  Link2,
  Sparkles,
  PlayCircle,
  Heading,
  Layers,
  Search,
} from "lucide-react";

export function BlockList() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    blocks,
    addBlock,
    updateBlock,
    removeBlock,
    toggleBlockActive,
    duplicateBlock,
    reorderBlocks,
  } = useBuilderStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderBlocks(active.id as string, over.id as string);
    }
  };

  const filteredBlocks = blocks.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.subtitle && b.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Top Action Bar: Big Add Button & Quick Type Chips */}
      <div className="space-y-3">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.99] transition cursor-pointer"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
          <span>Tambah Blok / Aset Baru</span>
        </button>

        {/* Quick Add Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => addBlock("link")}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-emerald-500/40 text-xs font-semibold text-zinc-300 hover:text-emerald-400 transition"
          >
            <Link2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>+ Link</span>
          </button>
          <button
            onClick={() => addBlock("product")}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-indigo-500/40 text-xs font-semibold text-zinc-300 hover:text-indigo-400 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>+ Produk</span>
          </button>
          <button
            onClick={() => addBlock("video")}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-rose-500/40 text-xs font-semibold text-zinc-300 hover:text-rose-400 transition"
          >
            <PlayCircle className="w-3.5 h-3.5 text-rose-400" />
            <span>+ Video</span>
          </button>
          <button
            onClick={() => addBlock("header")}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-amber-500/40 text-xs font-semibold text-zinc-300 hover:text-amber-400 transition"
          >
            <Heading className="w-3.5 h-3.5 text-amber-400" />
            <span>+ Header</span>
          </button>
        </div>
      </div>

      {/* Header Info & Search Filter */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-bold text-white">Daftar Blok ({blocks.length})</h3>
        </div>

        {blocks.length > 3 && (
          <div className="relative w-48">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari blok..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-zinc-300 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
            />
          </div>
        )}
      </div>

      {/* Sortable DnD Block List */}
      {blocks.length === 0 ? (
        <div className="text-center py-12 px-6 rounded-2xl bg-zinc-900/50 border border-dashed border-zinc-800 space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
            <Plus className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Belum Ada Blok</h4>
            <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
              Mulai buat profil tim dengan menambahkan link portofolio, video showreel, atau aset download gratis.
            </p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Blok Pertama</span>
          </button>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={filteredBlocks.map((b) => b.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {filteredBlocks.map((block) => (
                <BlockItemComponent
                  key={block.id}
                  block={block}
                  onUpdate={updateBlock}
                  onRemove={removeBlock}
                  onToggleActive={toggleBlockActive}
                  onDuplicate={duplicateBlock}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* Add Block Modal */}
      <AddBlockModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSelectType={(type: BlockType, template?: any) => {
          addBlock(type, template);
        }}
      />
    </div>
  );
}
