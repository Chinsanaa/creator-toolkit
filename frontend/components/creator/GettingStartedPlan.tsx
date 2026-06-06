import Link from 'next/link';

export interface PlanTask {
  id: string;
  label: string;
  detail: string;
  done: boolean;
  href: string;
}

export function GettingStartedPlan({ tasks }: { tasks: PlanTask[] }) {
  const completed = tasks.filter((t) => t.done).length;
  const progress = tasks.length > 0 ? (completed / tasks.length) * 100 : 0;

  return (
    <div className="creator-panel-lg">
      <h2 className="text-lg font-semibold tracking-tight text-landing-fg">Here&apos;s your plan</h2>
      <p className="mt-1 text-sm text-landing-muted">
        {completed} of {tasks.length} steps complete
      </p>
      <div className="creator-progress-track">
        <div className="creator-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <ul className="mt-6 space-y-3">
        {tasks.map((task) => (
          <li key={task.id}>
            <Link
              href={task.href}
              className={`creator-task ${task.done ? 'creator-task-done' : ''}`}
            >
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                  task.done
                    ? 'border-primary bg-primary text-white'
                    : 'border-violet-200 bg-white text-transparent'
                }`}
                aria-hidden
              >
                {task.done ? (
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : null}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-landing-fg">{task.label}</span>
                <span className="mt-0.5 block text-sm text-landing-muted">{task.detail}</span>
              </span>
              <span className="text-landing-muted" aria-hidden>
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
