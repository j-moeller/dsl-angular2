/*
 * Copyright Siemens AG, 2016
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
import { Component } from '@angular/core';
import { Tree, TreeComponent } from 'vindue';
import { NodeOrientation } from 'vindue';

import { TaskEditor_ } from '../../src-gen/views/task-editor.component';
import { ViewBarrelStrings, mapViewToHtmlElement } from './viewbarrel.model';
import { ViewModule } from './view.module';

@Component({
	selector: 'task-editor',
	template: `
		<ee-tree
			[windows]="windows"
			[map]="map"
			[modules]="modules"
			(on)="on($event)">
		</ee-tree>
	`
})

export class TaskEditor extends TaskEditor_ {
	constructor() { super(); }

	modules: any = [ViewModule];

	map = {
		callback: mapViewToHtmlElement
	};

	windows: string[] = ViewBarrelStrings.slice();

	on(e) {
		console.log(e);
	}
}
