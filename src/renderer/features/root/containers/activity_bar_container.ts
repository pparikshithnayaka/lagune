import ActivityBar from '@/renderer/features/root/components/activity_bar';
import { RootState } from '@/renderer/reducers';
import { connect } from 'react-redux';

const mapStateToProps = (_: RootState) => ({
  me: '1', // fix
});

export default connect(
  mapStateToProps,
)(ActivityBar);
