import { useCallback } from "react";
import { Link } from "@mui/material";
import {
  Interweave as BaseInterweave,
  InterweaveProps as BaseInterweaveProps,
} from "interweave";
import {
  EmailMatcher,
  HashtagMatcher,
  IpMatcher,
  UrlMatcher,
  UrlProps,
} from "interweave-autolink";

export interface InterweaveProps extends BaseInterweaveProps {
  defaultLinkColor?: string;
  defaultNewWindow?: boolean;
}

export default function Interweave({
  allowAttributes = true,
  allowElements = true,
  matchers = [],
  transform,
  tagName,
  noWrap,
  defaultNewWindow = false,
  defaultLinkColor = "primary",
  ...props
}: InterweaveProps) {
  const urlFactory = useCallback(
    ({ children, newWindow, ...props }: UrlProps) => (
      <URLMatcherFactory
        defaultLinkColor={defaultLinkColor}
        newWindow={defaultNewWindow || newWindow}
        {...props}
      >
        {children}
      </URLMatcherFactory>
    ),
    [defaultLinkColor, defaultNewWindow]
  );

  return (
    <BaseInterweave
      noWrap={noWrap || (noWrap === undefined && !!tagName)}
      allowAttributes={allowAttributes}
      allowElements={allowElements}
      matchers={[
        new UrlMatcher("url", { validateTLD: false }, urlFactory),
        new IpMatcher("ip", undefined, urlFactory),
        new HashtagMatcher("hashtag"),
        new EmailMatcher("email"),
        ...matchers,
      ]}
      transform={(node, children, config) => {
        const result = transform
          ? transform(node, children, config)
          : undefined;

        if (result !== undefined) {
          return result;
        }

        if (node.tagName === "A") {
          let linkColor: string = defaultLinkColor;
          const classListArray = [...node.classList.values()];

          classListArray.forEach((className) => {
            if (className.startsWith("color-")) {
              linkColor = className.slice(6);
              node.classList.remove(className);
            }
          });

          const props = Object.fromEntries(
            Object.values(node.attributes).map((attr) => [
              attr.name,
              attr.value,
            ])
          );
          if ("class" in props) {
            props.className = props.class;
            delete props.class;
          }

          if (props.target === undefined && defaultNewWindow) {
            props.target = "_blank";
          }

          return (
            <Link color={linkColor} {...props}>
              {children}
            </Link>
          );
        }
      }}
      {...props}
    />
  );
}

interface URLMatcherFactoryProps extends UrlProps {
  defaultLinkColor?: string;
  isIp?: boolean;
}

function URLMatcherFactory({
  children,
  url,
  newWindow,
  onClick,
  defaultLinkColor = "primary",
}: URLMatcherFactoryProps) {
  const href = url.startsWith("http") ? url : `http://${url}`;

  return (
    <Link
      color={defaultLinkColor}
      href={href}
      target={newWindow ? "_blank" : undefined}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
