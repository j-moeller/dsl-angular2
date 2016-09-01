/*
 * Copyright 2015-2016 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 *
 * @author Jonas Möller
 */
import { Component, Input, OnInit } from '@angular/core';

import { TreeHeaderComponent } from './ee-tree-header.component';
import { NodeComponent } from '../node/ee-node.component';
import { NodeOrientation } from '../node/ee-nodeorientation.enum';

import DataMapper = require('./datamapper.function');
import NodeInterface = require('../node/ee-treenode.interface');

export interface Tree extends NodeInterface.TreeNode {
	orientation: NodeOrientation
}

@Component({
	selector: 'ee-tree',
	styles: [`
		.add-window {
			height: 100%;
			width: 100%;
			background: rgba(0,0,0,0.5);
			position: absolute;
			top: 0px;
			left: 0px;
			pointer-events: none;
		}

		.add-window .closer span {
			position: absolute;
			top: 0px;
			right: 0px;
			line-height: 8px;
			border-top: 0px;
			border-right: 0px;
			border-top-left-radius: 0px;
			border-bottom-right-radius: 0px;
			padding: 16px 16px 16px 16px;
		}

		.add-window-wrapper {
			display: block;
			top: 15%;
			text-align: center;
			margin: 0px auto;
			position: relative;
			width: 650px;
			padding-top: 50px;
			padding-bottom: 20px;
			background: white;
			border-radius: 20px;
			pointer-events: all;
		}

		.add-window-wrapper input {
			width: 450px;
			height: 45px;
			font-size: 16pt;
			text-align: center;
			border-radius: 20px;
			outline: 0px !important;
		}

		.add-window-gallery {
			margin: 40px
		}

		.add-window-gallery li {
			display: inline-flex;
			margin: 20px;
			margin-bottom: 0px;
		}

		.add-window-gallery li a {
			display: inline-flex;
			/* background: white; */
			/* padding: 15px 20px 15px 20px; */
			border-radius: 10px;
			cursor: pointer;
			text-decoration: none;
			color: black;
		}
	`],
	template: `
		<div class="ee-tree" *ngIf="tree.branches.length > 0" (click)="hideAddWindow()">
			<ee-tree-header (add)="showAddWindow($event)"></ee-tree-header>
			<ee-node [node]="tree" [orientation]="tree.orientation" [dataMapper]="dataMapper"></ee-node>
		</div>
		<div [hidden]="tree.branches.length > 0 && !addWindow">
			<div class="add-window">
				<div class="add-window-wrapper">
					<div *ngIf="addWindow" class="closer ee-icon" (click)="hideAddWindow()"><span>x</span></div>
					<input type="text" [(ngModel)]="needle" placeholder="Type in the view you want to open..." tabindex="1" autofocus>
					<div class="add-window-gallery">
						<ul>
							<li *ngFor="let v of windows | LimitPipe:20 | StringFilterPipe:needle; let i = index" (click)="add(v)">
								<a class="btn btn-default" [attr.tabindex]="i+1" (keydown)="keyDown($event, v)">{{v}}</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	`
})

export class TreeComponent implements OnInit {
	@Input() windows: string[] = [];
	@Input() dataMapper: DataMapper.DataMapper;

	addWindow: boolean = false;
	needle: string = "";

	tree: Tree = {
		orientation: NodeOrientation.Vertical,
		branches: [{
			branches: [],
			data: "TaskDetails"
		}]
	};

	constructor() {
	}

	ngOnInit() { }

	showAddWindow(e: MouseEvent) {
		this.needle = "";
		this.addWindow = true;
		e.stopPropagation();
	}

	hideAddWindow() {
		this.addWindow = false;
	}

	add(view: string) {
		this.tree.branches.push({
			branches: [],
			data: view
		});
		this.hideAddWindow();
	}

	keyDown(e: KeyboardEvent, view: string) {
		if (e.key === "Enter") {
			this.add(view);
		}

		if (e.key === "Escape") {
			this.hideAddWindow();
		}
	}
}
