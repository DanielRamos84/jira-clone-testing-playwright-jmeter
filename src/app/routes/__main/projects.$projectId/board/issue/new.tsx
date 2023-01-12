import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { UserId } from "@domain/user";
import { ProjectId } from "@domain/project";
import { CategoryId } from "@domain/category";
import { Comment } from "@domain/comment";
import { PriorityId } from "@domain/priority";
import { isValidSort } from "@domain/filter";
import { createIssue, CreateIssueInputData } from "@infrastructure/db/issue";
import { IssuePanel } from "@app/ui/main/project/board/issue-panel";
import { textAreOnlySpaces } from "@utils/text-are-only-spaces";
import { emitter, EVENTS } from "@app/events";

export type ActionData = {
  errors: {
    name?: string;
  };
};

export const loader: LoaderFunction = async () => {
  return json(null);
};

export const action: ActionFunction = async ({ request, params }) => {
  const projectId = params.projectId as ProjectId;
  const formData = await request.formData();
  const _action = formData.get("_action") as string;
  const url = new URL(request.url);
  const sortByParam = url.searchParams.get("sortBy") as string;
  const sortBySeachParam = isValidSort(sortByParam)
    ? `?sortBy=${sortByParam}`
    : "";
  const previousUrl = `/projects/${projectId}/board${sortBySeachParam}`;

  if (_action === "upsert") {
    const name = formData.get("title") as string;
    const description = formData.get("description") as string;
    const categoryId = formData.get("status") as CategoryId;
    const priority = formData.get("priority") as PriorityId;
    const asigneeId = formData.get("asignee") as UserId;
    const reporterId = formData.get("reporter") as UserId;
    const comments = JSON.parse(
      formData.get("comments") as string
    ) as Comment[];
    const issueInputData: CreateIssueInputData = {
      name,
      description,
      categoryId,
      priority,
      asigneeId,
      reporterId,
      comments,
    };

    if (!name || textAreOnlySpaces(name)) {
      return json<ActionData>(
        { errors: { name: "Title is required" } },
        { status: 400 }
      );
    }

    await createIssue(issueInputData);

    emitter.emit(EVENTS.ISSUE_CHANGED, Date.now());
  }

  return redirect(previousUrl);
};

export default function IssuePanelRoute() {
  return <IssuePanel />;
}
