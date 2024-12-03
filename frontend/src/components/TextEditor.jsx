// RichTextEditor.js
import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor, useCKEditorCloud } from '@ckeditor/ckeditor5-react';

const LICENSE_KEY =
	'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3MzQ0Nzk5OTksImp0aSI6Ijk4MGVmZDgzLTVlMjAtNGEzZS05MDE2LWE5MmQ1YjI3YWRjZiIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjQ4NDAyOTliIn0.h4tNHuYLrgxgTadX5ojQB9VWnyzpMMPCqK0Tw6eMC4CS8xbGWyjc-etcm77GqwOdsYh3WKYV9fMDsG8249SeVw';

export default function TextEditor ({ onChange, initialData, placeholder }) {
	const editorContainerRef = useRef(null);
	const editorRef = useRef(null);
	const [isLayoutReady, setIsLayoutReady] = useState(false);
	const cloud = useCKEditorCloud({ version: '44.0.0' });

	useEffect(() => {
		setIsLayoutReady(true);
		return () => setIsLayoutReady(false);
	}, []);

	const { ClassicEditor, editorConfig } = useMemo(() => {
		if (cloud.status !== 'success' || !isLayoutReady) {
			return {};
		}

		const {
			ClassicEditor,
			Autoformat,
			AutoImage,
			Autosave,
			BlockQuote,
			Bold,
			CloudServices,
			Essentials,
			Heading,
			ImageBlock,
			ImageCaption,
			ImageInline,
			ImageInsertViaUrl,
			ImageResize,
			ImageStyle,
			ImageTextAlternative,
			ImageToolbar,
			ImageUpload,
			Indent,
			IndentBlock,
			Italic,
			Link,
			LinkImage,
			List,
			ListProperties,
			Paragraph,
			Table,
			TableCaption,
			TableCellProperties,
			TableColumnResize,
			TableProperties,
			TableToolbar,
			TextTransformation,
			TodoList,
			Underline
		} = cloud.CKEditor;

		return {
			ClassicEditor,
			editorConfig: {
				toolbar: {
					items: [
						'heading',
						'|',
						'bold',
						'italic',
						'underline',
						'|',
						'link',
						'insertTable',
						'blockQuote',
						'|',
						'bulletedList',
						'numberedList',
						'todoList',
						'outdent',
						'indent'
					],
					shouldNotGroupWhenFull: false
				},
				plugins: [
					Autoformat,
					AutoImage,
					Autosave,
					BlockQuote,
					Bold,
					CloudServices,
					Essentials,
					Heading,
					ImageBlock,
					ImageCaption,
					ImageInline,
					ImageInsertViaUrl,
					ImageResize,
					ImageStyle,
					ImageTextAlternative,
					ImageToolbar,
					ImageUpload,
					Indent,
					IndentBlock,
					Italic,
					Link,
					LinkImage,
					List,
					ListProperties,
					Paragraph,
					Table,
					TableCaption,
					TableCellProperties,
					TableColumnResize,
					TableProperties,
					TableToolbar,
					TextTransformation,
					TodoList,
					Underline
				],
				initialData: initialData || '',
				placeholder: placeholder || 'Type or paste your content here!',
				licenseKey: LICENSE_KEY
			}
		};
	}, [cloud, isLayoutReady, initialData, placeholder]);

	return (
		<div className="editor-container" ref={editorContainerRef}>
			{ClassicEditor && editorConfig && (
				<CKEditor
					editor={ClassicEditor}
					config={editorConfig}
					onReady={(editor) => (editorRef.current = editor)}
					onChange={(event, editor) => onChange && onChange(editor.getData())}
				/>
			)}
		</div>
	);
}
