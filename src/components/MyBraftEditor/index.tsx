import React, {useState, useEffect} from 'react'
// 引入编辑器组件
import BraftEditor, { EditorState } from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'

export default function MyBraftEditor () {

  const htmlContent = window.localStorage.getItem('editorContent') || null;
  // 创建一个空的editorState作为初始值
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(htmlContent));

  const submitContent = (val: EditorState) => {
      // 在编辑器获得焦点时按下ctrl+s会执行此方法
      // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
      const htmlContent = val ? val.toHTML() : editorState.toHTML();
      window.localStorage.setItem('editorContent', val.toRAW());
  }

  const handleEditorChange = (val: EditorState) => {
      setEditorState(val);
      submitContent(val);
      console.log(val.toRAW(), 'val');
  }

  return (
    <div className="my-component">
        <BraftEditor
            value={editorState}
            onChange={handleEditorChange}
            onSave={submitContent}
        />
    </div>
  );

}
