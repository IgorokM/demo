import {FlatTreeControl} from '@angular/cdk/tree';
import {Component} from '@angular/core';
import DynamicFlatNode from './DynamicFlatNode';
import {DynamicDatabaseService} from './dynamic-database.service';
import {DynamicDataSourceService} from './dynamic-data-source.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  treeControl: FlatTreeControl<DynamicFlatNode>;
  dataSource: DynamicDataSourceService;

  constructor(private database: DynamicDatabaseService) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSourceService(this.treeControl, database);

    this.dataSource.data = database.initialData();
  }

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (i: number, nodeData: DynamicFlatNode) => nodeData.expandable;
}
