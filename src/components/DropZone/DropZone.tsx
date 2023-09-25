import clsx from "clsx";
import { XCircle } from "phosphor-react";
import React, { ChangeEventHandler, FC } from "react";
import { useDropzone } from "react-dropzone";

type ExtendedFile = File & {
	thumbnail?: string;
	id: string;
};

interface DropzoneProps {
	className?: string;
	multiple?: boolean;
	files: ExtendedFile[];
	onDrop: (acceptedFiles: File[]) => void;
	onRemove: (fileId: string) => void;
	onChange?: ChangeEventHandler<HTMLInputElement>;
}

const DropZone: FC<DropzoneProps> = ({
	className,
	onDrop,
	onRemove,
	files,
	multiple,
	onChange,
	...rest
}) => {
	const { getRootProps, getInputProps, isDragActive, isDragReject } =
		useDropzone({
			onDrop,
			accept: {
				"image/*": [],
			},
			multiple,
			...rest,
		});

	return (
		<>
			<div
				{...getRootProps({
					className: clsx(`border p-4 border-dashed`, className),
				})}>
				<input {...getInputProps({ onChange })} />
				{!isDragActive && (
					<span className="text-sm">Click here or drop a file to upload!</span>
				)}
				{isDragActive && !isDragReject && "Drop it now"}
				{isDragReject && (
					<span className="text-sm font-poppins font-bold text-red">
						You can only upload images, sorry!
					</span>
				)}
			</div>
			<ul className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{files.map((file, index) => (
					<li key={file.id} className="relative">
						<img
							src={file.thumbnail}
							width={100}
							height={100}
							className="w-20 h-20 rounded-md"
						/>
						<button
							onClick={() => onRemove(file.id)}
							className="absolute -bottom-2 -right-2 cursor-pointer bg-white rounded-full">
							<XCircle size={32} className="text-red" />
						</button>
					</li>
				))}
			</ul>
		</>
	);
};

export default DropZone;
