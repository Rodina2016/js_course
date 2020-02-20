'use strict';

document.addEventListener('DOMContentLoaded', function () {
    const countBtn = document.getElementById('start');
    const plusBtnList = document.getElementsByTagName('button');
    const addExpenceBtn = plusBtnList[0];
    const obligExpenceBtn = plusBtnList[1];
    const checkBox = document.querySelector('#deposit-check');
    const addExpensesItems = document.querySelectorAll('.additional_expenses-item')[0];
    const valueList = document.querySelectorAll('[class$="value"]');
    const budgetMonthValue = valueList[0];
    const budgetDayValue = valueList[1];
    const expensesMonthValue = valueList[2];
    const additionalIncomeValue = valueList[3];
    const additionalExpensesValue = valueList[4];
    const incomePeriodValue = valueList[5];
    const targetMonthValue = valueList[6];
    const salaryAmount = document.querySelector('.salary-amount');
    const incomeTitle = document.querySelector('.income-title');
    const incomeAmount = document.querySelector('.income-amount');
    const additionalIncomeItem1  = document.querySelectorAll('.additional_income-item')[0];
    const additionalIncomeItem2 = document.querySelectorAll('.additional_income-item')[1];
    const expensesTitle = document.querySelector('.expenses-title');
    const expensesAmount = document.querySelector('.expenses-amount');
    const additionalExpensesItem = document.querySelector('.additional_expenses-item');
    const targetAmount = document.querySelector('.target-amount');
    const periodSelect = document.querySelector('.period-select');
});