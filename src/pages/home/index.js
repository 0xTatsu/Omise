import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { formatter } from 'src/common/utils';
import Loading from 'src/components/loading';

import {
  initHomeData,
  handleSubmitDonate,
  homeLoadingSelector,
  charitiesSelector,
} from './widgets';
import { HomeWrapper, Title } from './styled';
import CharityList from './charity-list';

class Home extends React.Component {
  componentDidMount() {
    this.props.initHomeData();
  }

  handleDonate = ({ charitiesId, charitiesName, amount }) => {
    const { handleSubmitDonate } = this.props;
    return handleSubmitDonate({ charitiesId, charitiesName, amount });
  };

  render() {
    const { isLoading, allDonation, charities } = this.props;
    if (isLoading) return <Loading position="fixed" />;
    return (
      <HomeWrapper>
        <Title>Omise Tamboon React</Title>
        <p>All donations: {formatter.format(allDonation)}</p>
        <CharityList charities={charities} onDonate={this.handleDonate} />
      </HomeWrapper>
    );
  }
}

Home.propTypes = {
  initHomeData: PropTypes.func.isRequired,
  allDonation: PropTypes.number.isRequired,
  charities: PropTypes.array,
};

Home.defaultProps = {
  charities: [],
};

export default connect(
  state => ({
    allDonation: state.donate.allDonation,
    amountById: state.donate.sumAmountByCharity,
    charities: charitiesSelector(state),
    isLoading: homeLoadingSelector(state),
  }),
  { initHomeData, handleSubmitDonate }
)(Home);
