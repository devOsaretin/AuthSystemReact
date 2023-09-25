import React, { ChangeEventHandler, FC, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Control, Controller } from "react-hook-form";

type ExtendedFile = File & {
	thumbnail?: string;
};

interface DropzoneProps {
	className?: string;
	multiple?: boolean;
	files: ExtendedFile[];
	onDrop: (acceptedFiles: File[]) => void;
	onRemove: (fileName: string) => void;
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
			<div {...getRootProps({ className: className })}>
				<input {...getInputProps({ onChange })} />
				{!isDragActive && "Click here or drop a file to upload!"}
				{isDragActive && !isDragReject && "Drop it now"}
				{isDragReject && "You can only upload images, sorry!"}
			</div>
			<ul className="flex gap-2 my-2">
				{files.map((file, index) => (
					<li key={file.name + index}>
						<img src={file.thumbnail} width={100} height={100} />
						<button onClick={() => onRemove(file.name)}>X</button>
					</li>
				))}
			</ul>
		</>
	);
};

export default DropZone;
