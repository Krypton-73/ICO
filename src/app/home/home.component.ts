import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private hserv: HomeService
  ) { }

  ngOnInit() {
    this.makeGraph();
  }

  makeGraph() {
    this.hserv.chartQuery()
    .subscribe(
      data => {
        // console.log(data);
        Highcharts.chart('container', {
          chart: {
            zoomType: 'x'
          },
          title: {
            text: 'USD to EUR exchange rate over time'
          },
          // subtitle: {
          //   text: document.ontouchstart === undefined ?
          //       'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
          // },
          xAxis: {
            type: 'datetime'
          },
          yAxis: {
            title: {
              text: 'Exchange rate'
            }
          },
          legend: {
            enabled: false
          },
          plotOptions: {
            area: {
              fillColor: {
                linearGradient: {
                  x1: 0,
                  y1: 0,
                  x2: 0,
                  y2: 1
                },
                stops: [
                  [0, Highcharts.getOptions().colors[0]],
                  [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
              },
              marker: {
                radius: 2
              },
              lineWidth: 1,
              states: {
                hover: {
                  lineWidth: 1
                }
              },
              threshold: null
            }
          },
          series: [{
            type: 'area',
            name: 'USD to EUR',
            data: data
          }]
        });
      },
      e => {
        console.log(e);
      }
    );
  } // https://www.highcharts.com/demo/line-time-series/dark-unica
}
