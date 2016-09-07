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
import { Component, EventEmitter, Input } from '@angular/core';

import { TaskDetails_ } from '../../src-gen/views/task-details.component';
import { TaskActionLoader } from '../../src-gen/services/taskactionloader.service';
import { CommentLoader } from '../../src-gen/services/commentloader.service';
import { Entity } from '../../src-gen/entities/entity.model';

import { tasks } from '../../src-gen/services/server.mockup';

export const TaskDetailsSelector: string = 'task-details';

@Component({
	selector: TaskDetailsSelector,
	template: `
		<ee-table (onSelect)="onSelect($event)" [entities]="cEntities"></ee-table>
		<ee-table (onSelect)="onSelect($event)" [entities]="tEntities"></ee-table>
	`,
	providers: [TaskActionLoader, CommentLoader]
})

export class TaskDetails extends TaskDetails_ {
	cEntities: Entity[] = [];
	tEntities: Entity[] = [];

	constructor(public tloader: TaskActionLoader, public cloader: CommentLoader) {
		super();
	}

	ngOnInit() {
		super.ngOnInit();

		this.viewModel.task = tasks[1];

		if (this.viewModel.task) {
			this.cloader.getComments().then((entities) => {
				this.cEntities = entities.filter((element) => {
					return element.task === this.viewModel.task;
				});
			});
			this.tloader.getTaskActions().then((entities) => {
				this.tEntities = entities.filter((element) => {
					return element.task === this.viewModel.task;
				});
			});
		}
	}

	onSelect(e) {
		this.onEmitter.emit({
			event: e,
			type: "Select"
		});
	}
}
