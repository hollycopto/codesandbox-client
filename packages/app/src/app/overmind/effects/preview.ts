import { dispatch } from 'codesandbox-api'
import BasePreview from '@codesandbox/common/lib/components/Preview';
import { blocker } from 'app/utils/blocker';

let _preview = blocker<BasePreview>();

export default {
  initialize() {},
  initializePreview(preview: any) {
    _preview.resolve(preview);
    return () => {
      _preview = blocker<any>();
    };
  },
  async executeCodeImmediately({
    initialRender = false,
    showFullScreen = false,
  } = {}) {
    const preview = await _preview.promise;
    preview.executeCodeImmediately(initialRender, showFullScreen);
  },
  async executeCode() {
    const preview = await _preview.promise;
    preview.executeCode();
  },
  async refresh() {
    const preview = await _preview.promise;
    preview.handleRefresh();
  },
  async updateAddressbarUrl() {
    const preview = await _preview.promise;
    preview.updateAddressbarUrl();
  },
  async getIframBoundingRect() {
    const preview = await _preview.promise;

    return preview.element.getBoundingClientRect();
  },
  async getPreviewPath() {
    const preview = await _preview.promise;

    let path = preview.state.urlInAddressBar;

    path = path.replace('http://', '').replace('https://', '');

    return path.substr(path.indexOf('/'));
  },
  takeScreenshot() {
    // this dispatch triggers a "screenshot-generated" message
    // which is received inside the PreviewCommentWrapper
    dispatch({
      type: 'take-screenshot',
    });
  }
};
