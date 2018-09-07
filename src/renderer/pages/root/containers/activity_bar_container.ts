import ActivityBar from '@/renderer/pages/root/components/activity_bar';
import { RootState } from '@/renderer/store/reducers';
import { connect } from 'react-redux';

const mapStateToProps = (_: RootState) => ({
  me: '1', // fix
});

export default connect(
  mapStateToProps,
)(ActivityBar);
