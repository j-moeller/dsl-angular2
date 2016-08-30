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
import { Component } from '@angular/core';

import { TaskDetails_ } from '../../src-gen/views/task-details.component';
import { TaskActionLoader } from '../../src-gen/services/taskactionloader.service';
import { CommentLoader } from '../../src-gen/services/commentloader.service';
import { Entity } from '../../src-gen/entities/entity.model';

export const TaskDetailsSelector: string = 'task-details';

@Component({
	selector: TaskDetailsSelector,
	template: `
		<h2>TaskDetails</h2>
		<ee-table [entities]="cEntities"></ee-table>
		<ee-table [entities]="tEntities"></ee-table>
	`,
	providers: [TaskActionLoader, CommentLoader]
})

export class TaskDetails extends TaskDetails_ {
	cEntities: Entity[] = [];
	tEntities: Entity[] = [];

	constructor(public tloader: TaskActionLoader, public cloader: CommentLoader) { super(); }

	ngOnInit() {
		super.ngOnInit();
		this.cloader.getComments().then((entities) => this.cEntities = entities);
		this.tloader.getTaskActions().then((entities) => this.tEntities = entities);
	}
}
