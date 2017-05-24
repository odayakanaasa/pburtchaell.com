import paths from '../paths';
import WorkItemRoute from './component';

export default {
  path: paths.WORK_ITEM,
  props: {
    config: {
      footer: {
        linkTo: {
          path: paths.WORK,
          title: 'My Work'
        },
        linkToTop: true
      }
    },
  },
  component: WorkItemRoute
};
