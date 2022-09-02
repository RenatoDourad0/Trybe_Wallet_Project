import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { connect } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

class ExpensesChart extends React.Component {
  getData = (expenses) => {
    let sortedExpenses = expenses.sort((a,b) => {
      return b.value -  a.value;
    });
    const slicedExpenses = sortedExpenses.length > 5 ? sortedExpenses.slice(0,5) : sortedExpenses;
    const data = {
      labels: slicedExpenses.map((expense) => expense.description),
      values: slicedExpenses.map((expense) => parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2))
    };
    return data;
  }
  
  generateData = () => {
    const { expenses } = this.props;

    const info = this.getData(expenses);

    const data = {
      labels: [...info.labels],
      datasets: [
        {
          label: '',
          data: [...info.values],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
    return data;
  }

  render() {
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Maiores Despesas',
        },
      },
    };
    return (
        <div className="chartContainer">
          <h3 className="chartHeading">Maiores despesas</h3>
          <Pie data={ this.generateData() } options={ options }/>
        </div>
    );
  }
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(ExpensesChart);
