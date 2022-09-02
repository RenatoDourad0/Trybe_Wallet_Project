import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import TagsChart from '../components/TagsChart';
import ExpensesChart from '../components/ExpensesChart';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <>
        <section className="walletHeader">
          <Header />
          <WalletForm />
        </section>
        <section className="walletTable">
          <Table />
        </section>
        { expenses.length
          && (
          <section className="walletChart">
            <div className="chartsContainer">
              <TagsChart />
              <ExpensesChart /> 
            </div>
          </section>
          )
        }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
})

export default connect(mapStateToProps, null)(Wallet);
