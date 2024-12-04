import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import './content-editable.css'

interface IContentEditableProps  {
  className?: string;
  placeholderClassName?: string;
  placeholder: string;
};


export default function LexicalContentEditable({
  className,
  placeholder,
  placeholderClassName,
}: IContentEditableProps) {

  return (
    <ContentEditable
      className={className ?? 'ContentEditable__root'}
      aria-placeholder={placeholder}
      placeholder={
        <div className={placeholderClassName ?? 'ContentEditable__placeholder'}>
          {placeholder}
        </div>
      }
    />
  )
}
