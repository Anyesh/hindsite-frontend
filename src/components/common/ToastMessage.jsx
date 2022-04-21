import cogoToast from 'cogo-toast';

export const setToast = (code, msg) => {
  const conf = { position: 'top-right', hideAfter: 3 };
  if (code === 'error') {
    cogoToast.error(msg, conf);
  } else if (code === 'success') {
    cogoToast.success(msg, conf);
  } else if (code === 'info') {
    cogoToast.info(msg, conf);
  }
};
