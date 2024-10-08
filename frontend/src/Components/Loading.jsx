
const Loading = () => {
    return (
        <div>

<div role="status">
    <svg aria-hidden="true" className="inline w-12 h-8 text-gray-200 dark:text-gray-600 fill-green-500 " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="15" cy="15" r="15">
    <animate attributeName="r" from="15" to="15"
      begin="0s" dur="0.8s"
      values="15;9;15" calcMode="linear"
      repeatCount="indefinite" />
    <animate attributeName="fill-opacity" from="1" to="1"
      begin="0s" dur="0.8s"
      values="1;.5;1" calcMode="linear"
      repeatCount="indefinite" />
  </circle>
  <circle cx="60" cy="15" r="9" fillOpacity="0.3">
    <animate attributeName="r" from="9" to="9"
      begin="0s" dur="0.8s"
      values="9;15;9" calcMode="linear"
      repeatCount="indefinite" />
    <animate attributeName="fill-opacity" from="0.5" to="0.5"
      begin="0s" dur="0.8s"
      values=".5;1;.5" calcMode="linear"
      repeatCount="indefinite" />
  </circle>
  <circle cx="105" cy="15" r="15">
    <animate attributeName="r" from="15" to="15"
      begin="0s" dur="0.8s"
      values="15;9;15" calcMode="linear"
      repeatCount="indefinite" />
    <animate attributeName="fill-opacity" from="1" to="1"
      begin="0s" dur="0.8s"
      values="1;.5;1" calcMode="linear"
      repeatCount="indefinite" />
  </circle>
    </svg>
    <span className="sr-only">Loading...</span>
</div>

        </div>
    )
}

export default Loading
