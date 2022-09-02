import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { connect } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

class TagsChart extends React.Component {
  getTotal = (expenses, category) => {
    const total = expenses
    .filter((expense) => expense.tag === category)
    .map((filteredExpense) => filteredExpense.value * filteredExpense.exchangeRates[filteredExpense.currency].ask)
    .reduce((acc,curr) => acc + curr, 0)
    .toFixed(2);
    return total;
  }
  
  generateData = () => {
    const { expenses } = this.props;

    const totalAlimentação = this.getTotal(expenses, 'Alimentação');
    const totalLazer = this.getTotal(expenses, 'Lazer');
    const totalTransporte = this.getTotal(expenses, 'Transporte');
    const totalTrabalho = this.getTotal(expenses, 'Trabalho');
    const totalSaúde = this.getTotal(expenses, 'Saúde');

    const data = {
      labels: ['Alimentação', 'Lazer', 'Transporte','Trabalho', 'Saúde'],
      datasets: [
        {
          label: '',
          data: [totalAlimentação, totalLazer, totalTransporte, totalTrabalho, totalSaúde],
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
          text: 'Despesas por Categoria',
        },
      },
    };
    return (
        <div className="chartContainer">
          <h3 className="chartHeading">Despesas por categoria</h3>
          <Pie data={ this.generateData() } options={ options }/>
        </div>
    );
  }
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(TagsChart);
