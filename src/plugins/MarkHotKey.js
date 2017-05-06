import { isCTRL } from '../utils/Keyboard';

export default function MarkHotKey({ type, key }) {
  return {
    onKeyDown(event, data, state) {
      if (!isCTRL(event) || event.which !== key) {
        return
      }
      event.preventDefault();
      return state.transform().toggleMark(type).apply();
    }
  };
};
