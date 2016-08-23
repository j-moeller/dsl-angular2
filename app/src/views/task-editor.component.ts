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

import { TaskEditor_ } from '../../src-gen/views/task-editor.component';
import { TaskExplorer } from './task-explorer.component';
import { TaskDetails } from './task-details.component';
import { TaskSearch } from './task-search.component';

@Component({
	selector: 'task-editor',
	template: `
		<h1>TaskEditor</h1>
		<div>
			<task-explorer [viewModel]="viewModel"></task-explorer>
			<task-details [viewModel]="viewModel"></task-details>
			<task-search [viewModel]="viewModel"></task-search>
		</div>
	`,
	directives: [TaskExplorer, TaskDetails, TaskSearch]
})

export class TaskEditor extends TaskEditor_ {
	constructor() { super(); }
}