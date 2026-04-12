import { Download, Film, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useScopedT } from "@/contexts/I18nContext";
import {
	type ExportFormat,
	type ExportQuality,
	GIF_FRAME_RATES,
	GIF_SIZE_PRESETS,
} from "@/lib/exporter";
import { cn } from "@/lib/utils";

interface ExportSettingsDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onExport: () => void;
	exportFormat: ExportFormat;
	onExportFormatChange: (format: ExportFormat) => void;
	exportQuality: ExportQuality;
	onExportQualityChange: (quality: ExportQuality) => void;
	gifFrameRate: number;
	onGifFrameRateChange: (rate: 15 | 20 | 25 | 30) => void;
	gifLoop: boolean;
	onGifLoopChange: (loop: boolean) => void;
	gifSizePreset: "small" | "medium" | "large" | "original";
	onGifSizePresetChange: (preset: "small" | "medium" | "large" | "original") => void;
	gifOutputDimensions: { width: number; height: number };
	unsavedExport: {
		arrayBuffer: ArrayBuffer;
		fileName: string;
		format: string;
	} | null;
	onSaveUnsavedExport?: () => void;
}

export function ExportSettingsDialog({
	open,
	onOpenChange,
	onExport,
	exportFormat,
	onExportFormatChange,
	exportQuality,
	onExportQualityChange,
	gifFrameRate,
	onGifFrameRateChange,
	gifLoop,
	onGifLoopChange,
	gifSizePreset,
	onGifSizePresetChange,
	gifOutputDimensions,
	unsavedExport,
	onSaveUnsavedExport,
}: ExportSettingsDialogProps) {
	const t = useScopedT("settings");

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="bg-[#09090b] border-white/10 text-slate-200 max-w-[460px]">
				<DialogHeader>
					<DialogTitle className="text-base font-semibold text-slate-100">
						{exportFormat === "gif" ? t("export.gifButton") : t("export.videoButton")}
					</DialogTitle>
				</DialogHeader>

				<div className="space-y-3">
					<div className="flex items-center gap-2">
						<button
							type="button"
							onClick={() => onExportFormatChange("mp4")}
							className={cn(
								"flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border transition-all text-xs font-medium",
								exportFormat === "mp4"
									? "bg-[#34B27B]/10 border-[#34B27B]/50 text-white"
									: "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200",
							)}
						>
							<Film className="w-3.5 h-3.5" />
							{t("exportFormat.mp4")}
						</button>
						<button
							type="button"
							onClick={() => onExportFormatChange("gif")}
							className={cn(
								"flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border transition-all text-xs font-medium",
								exportFormat === "gif"
									? "bg-[#34B27B]/10 border-[#34B27B]/50 text-white"
									: "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200",
							)}
						>
							<Image className="w-3.5 h-3.5" />
							{t("exportFormat.gif")}
						</button>
					</div>

					{exportFormat === "mp4" && (
						<div className="bg-white/5 border border-white/5 p-0.5 w-full grid grid-cols-3 h-8 rounded-lg">
							<button
								type="button"
								onClick={() => onExportQualityChange("medium")}
								className={cn(
									"rounded-md transition-all text-[11px] font-medium",
									exportQuality === "medium"
										? "bg-white text-black"
										: "text-slate-400 hover:text-slate-200",
								)}
							>
								{t("exportQuality.low")}
							</button>
							<button
								type="button"
								onClick={() => onExportQualityChange("good")}
								className={cn(
									"rounded-md transition-all text-[11px] font-medium",
									exportQuality === "good"
										? "bg-white text-black"
										: "text-slate-400 hover:text-slate-200",
								)}
							>
								{t("exportQuality.medium")}
							</button>
							<button
								type="button"
								onClick={() => onExportQualityChange("source")}
								className={cn(
									"rounded-md transition-all text-[11px] font-medium",
									exportQuality === "source"
										? "bg-white text-black"
										: "text-slate-400 hover:text-slate-200",
								)}
							>
								{t("exportQuality.high")}
							</button>
						</div>
					)}

					{exportFormat === "gif" && (
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<div className="flex-1 bg-white/5 border border-white/5 p-0.5 grid grid-cols-4 h-8 rounded-lg">
									{GIF_FRAME_RATES.map((rate) => (
										<button
											type="button"
											key={rate.value}
											onClick={() => onGifFrameRateChange(rate.value)}
											className={cn(
												"rounded-md transition-all text-[11px] font-medium",
												gifFrameRate === rate.value
													? "bg-white text-black"
													: "text-slate-400 hover:text-slate-200",
											)}
										>
											{rate.value}
										</button>
									))}
								</div>
								<div className="flex-1 bg-white/5 border border-white/5 p-0.5 grid grid-cols-4 h-8 rounded-lg">
									{Object.keys(GIF_SIZE_PRESETS).map((key) => (
										<button
											type="button"
											key={key}
											onClick={() => onGifSizePresetChange(key as typeof gifSizePreset)}
											className={cn(
												"rounded-md transition-all text-[11px] font-medium",
												gifSizePreset === key
													? "bg-white text-black"
													: "text-slate-400 hover:text-slate-200",
											)}
										>
											{key === "original" ? "Orig" : key.charAt(0).toUpperCase() + key.slice(1, 3)}
										</button>
									))}
								</div>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-[11px] text-slate-500">
									{gifOutputDimensions.width} x {gifOutputDimensions.height}px
								</span>
								<div className="flex items-center gap-2">
									<span className="text-[11px] text-slate-400">{t("gifSettings.loop")}</span>
									<Switch
										checked={gifLoop}
										onCheckedChange={onGifLoopChange}
										className="data-[state=checked]:bg-[#34B27B] scale-90"
									/>
								</div>
							</div>
						</div>
					)}

					{unsavedExport && (
						<Button
							type="button"
							onClick={onSaveUnsavedExport}
							className="w-full h-10 bg-indigo-500 hover:bg-indigo-500/90 text-white"
						>
							<Download className="w-4 h-4 mr-2" />
							{t("export.chooseSaveLocation")}
						</Button>
					)}

					<Button
						type="button"
						onClick={onExport}
						className="w-full h-11 bg-[#34B27B] hover:bg-[#34B27B]/90 text-white"
					>
						<Download className="w-4 h-4 mr-2" />
						{exportFormat === "gif" ? t("export.gifButton") : t("export.videoButton")}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
