import styled from 'styled-components';
import Dropzone from 'react-dropzone';

const StyledDropzone = styled(Dropzone)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 9rem;
  flex: 0.5;
  border: 0.0625rem dashed #e3e6ea;
  border-radius: 0.3125rem;
  padding: 1.25rem 0.9375rem;
  background-color: #fafafa;
  &.active {
    border-color: green;
  }
  .dropzoneNote {
    margin-left: 0.5rem;
  }
`;

export default StyledDropzone;
